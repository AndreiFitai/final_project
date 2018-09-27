const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const base64url = require("base64url");
const User = require("../models/User");
const Prices = require("../models/Prices");
const TrackedCoins = require("../models/TrackedCoins");

const token = config.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const decodedEmail = base64url.decode(match[1]); // the captured "whatever"

  const response = `Hi, ${decodedEmail} ! Nice to meet you ! You have succesfuly connected !`;

  User.findOneAndUpdate(
    {
      email: decodedEmail
    },
    {
      chatId
    }
  ).then(e => {
    bot.sendMessage(chatId, response);
  });
});

bot.onText(/\/check (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const response = `Checking ... `;
  bot.sendMessage(chatId, response);
  if (match[1] === "all") {
    checkAllTrackedCoins(chatId);
  } else {
    let coin = match[1].toUpperCase();
    sendCoinPrice(chatId, coin);
  }
});

function sendCoinPrice(chatId, coin) {
  Prices.find({}).then(result => {
    console.log(coin);
    let coinData = result[0].prices.filter(el => {
      return el.currency == coin;
    });
    console.log(coinData);
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
              }$ ! Visit CoinBotBuddy.com to select new tracking targets :)`
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
  console.log("notify user called");
  User.find({
    chatId: chatId
  }).then(user => {
    TrackedCoins.find({}).then(result => {
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

module.exports = {
  checkTrackedCoinsTelegram
};
