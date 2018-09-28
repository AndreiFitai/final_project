const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const base64url = require("base64url");
const User = require("../models/User");
const Prices = require("../models/Prices");
const TrackedCoins = require("../models/TrackedCoins");
const jokes = require("./jokes");
const token = config.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

let chatIdConfirm;
bot.onText(/\/start (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const decodedEmail = base64url.decode(match[1]); // the captured "whatever"

  let response = `Hello! This chat is now connected to the ${decodedEmail} account.  \n\nYou have succesfully registered your account for notifications from me 😃 ! \n\nType /help anytime to checkout available commands!`;
  if (msg.chat.first_name) {
    response = `Hi, *${
      msg.chat.first_name
    }*! This chat is now connected to the ${decodedEmail} account.  \n\nYou have succesfully registered your account for notifications from me 😃 !  \n\nType /help anytime to checkout available commands!`;
  }

  User.findOneAndUpdate(
    {
      email: decodedEmail
    },
    {
      chatId
    }
  ).then(e => {
    bot.sendMessage(chatId, response, {
      parse_mode: "Markdown"
    });
    chatIdConfirm = chatId;
  });
});

bot.onText(/\/check (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  if (match[1] === "all") {
    checkAllTrackedCoins(chatId);
  } else {
    let coin = match[1].toUpperCase();
    sendCoinPrice(chatId, coin);
  }
});

bot.onText(/\/example/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Tracking target for BTC reached ! Current price is 6570.405$! Visit CoinBotBuddy.com to select new tracking targets :)`
  );
});

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   let response = "Hi there ! Type /help to check available commands."
//   if (msg.text == '/help') {
//     response = "/check all - Get all tracked coins current prices \n/check *symbol* - Get current price for specified coin e.g. ETH \n/joke - Get a joke of course :)"
//   }
//   if (msg.text === '/joke') {
//     response = getRandomJoke()
//   }
//   bot.sendMessage(chatId, response, {
//     parse_mode: "Markdown"
//   });
// });

bot.onText(/\/joke/, (msg, match) => {
  const chatId = msg.chat.id;
  let response = getRandomJoke();
  bot.sendMessage(chatId, response, {
    parse_mode: "Markdown"
  });
});

bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;
  let response =
    "/check all - Get all tracked coins current prices \n/check *symbol* - Get current price for specified coin e.g. ETH \n/joke - Get a joke of course 😁";
  bot.sendMessage(chatId, response, {
    parse_mode: "Markdown"
  });
});

function getRandomJoke() {
  let rand = Math.floor(Math.random() * Math.floor(jokes.length - 1));
  return jokes[rand];
}

function sendCoinPrice(chatId, coin) {
  Prices.find({}).then(result => {
    let coinData = result[0].prices.filter(el => {
      return el.currency == coin;
    });
    bot.sendMessage(
      chatId,
      `Current price of ${coin} is ${coinData[0].price} $`
    );
  });
}

function checkTrackedCoinsTelegram() {
  let targetReached = false;
  TrackedCoins.find({
    telegram_track: true
  }).then(result => {
    result.forEach(element => {
      Prices.find({}).then(result => {
        let coinData = result[0].prices.filter(el => {
          return el.currency === element.coin;
        });
        if (
          coinData[0].price >=
          Number(element.price_current) +
            Number(element.price_current) * (Number(element.target_price) / 100)
        ) {
          targetReached = true;
        }
        User.find({
          email: element.email
        }).then(user => {
          if (targetReached) {
            bot.sendMessage(
              user[0].chatId,
              `Tracking target for ${element.coin} reached ! Current price is ${
                coinData[0].price
              }$! Visit CoinBotBuddy.com to select new tracking targets :)`
            );
            targetReached = false;
            TrackedCoins.findOneAndUpdate(
              {
                email: user[0].email,
                coin: element.coin
              },
              {
                telegram_track: false
              },
              {
                upsert: true
              }
            ).then();
          }
        });
      });
    });
  });
}

function checkAllTrackedCoins(chatId) {
  User.find({
    chatId: chatId
  }).then(user => {
    TrackedCoins.find({ email: user[0].email }).then(result => {
      result.forEach(element => {
        Prices.find({}).then(result => {
          let coinData = result[0].prices.filter(el => {
            return el.currency === element.coin;
          });
          bot.sendMessage(
            user[0].chatId,
            `Current price of ${element.coin} is ${coinData[0].price}$ !`
          );
        });
      });
    });
  });
}

function confirmConnection() {
  return chatIdConfirm;
}

function resetConfirm() {
  chatIdConfirm = undefined;
}

module.exports = {
  checkTrackedCoinsTelegram,
  confirmConnection,
  resetConfirm
};
