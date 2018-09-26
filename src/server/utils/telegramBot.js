const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const base64url = require("base64url");
const User = require("../models/User");
const Prices = require("../models/Prices");
const TrackedCoins = require("../models/TrackedCoins");

const token = config.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const decodedEmail = base64url.decode(match[1]); // the captured "whatever"

  const response = `Hi, ${decodedEmail} ! Nice to meet you ! You have succesfuly connected !`;

  User.findOneAndUpdate({ email: decodedEmail }, { chatId }).then(e => {
    console.log(e);
    bot.sendMessage(chatId, response);
  });
});

bot.onText(/\/notify (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const response = `Starting notification function`;
  bot.sendMessage(chatId, response);
  notifyUser(match[1]);
});

function sendCoinPrice(chatId, coin) {
  Prices.find({}).then(result => {
    let coinData = result[0].prices.filter(el => {
      return el.currency === coin;
    });
    console.log(coinData);
    bot.sendMessage(
      chatId,
      `Current price of ${coin} is ${coinData[0].price} $`
    );
  });
}

function notifyUser(all) {
  let whatToCheck = { telegram_track: true };
  let check = false;
  if (all === "all") {
    check = true;
    whatToCheck = {};
  }
  console.log(all, whatToCheck);
  TrackedCoins.find(whatToCheck).then(result => {
    result.forEach(element => {
      Prices.find({}).then(result => {
        let coinData = result[0].prices.filter(el => {
          return el.currency === element.coin;
        });
        console.log(
          Number(element.price_current) +
            Number(element.price_current) *
              (Number(element.target_price1) / 100),
          coinData[0].price
        );
        if (
          Number(element.price_current) +
            Number(element.price_current) *
              (Number(element.target_price1) / 100) >=
          coinData[0].price
        ) {
          User.find({ email: element.email }).then(user => {
            let response = check
              ? `Current price of ${element.coin} is ${coinData[0].price}$ !`
              : `Tracking target for ${
                  element.coin
                } reached ! Current price is ${
                  coinData[0].price
                }$ ! Visit CoinBotBuddy.com to select new tracking targets :)`;
            bot.sendMessage(user[0].chatId, responses);
          });
        }
      });
    });
  });
}

module.exports = {
  sendCoinPrice
};
