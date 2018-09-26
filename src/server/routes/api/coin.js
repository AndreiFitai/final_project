const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../../config");
const moment = require("moment");
const CoinHistory = require("../../models/CoinHistory");
const Prices = require("../../models/Prices");
const Top10 = require("../../models/Top10");
const User = require("../../models/User");
const TrackedCoins = require("../../models/TrackedCoins");
const CoinDashboard = require("../../models/CoinDashboard");

let filteredCoinNames = [];

router.get("/price/:coinName", (req, res) => {
  Prices.find({})
    .then(result => {
      let foundCoin = result[0].prices.filter(el => {
        return el.currency == req.params.coinName;
      });
      res.send(foundCoin);
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
});

router.get("/top10prices", (req, res) => {
  Prices.find({})
    .then(result => {
      const filteredPrices = result[0].prices.filter(el => {
        return filteredCoinNames.indexOf(el.currency) !== -1;
      });
      res.send(filteredPrices);
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
});

//gets historical data of coins from db -> data is split in days/week/month/year each containing all the coins
router.get("/history", (req, res) => {
  CoinHistory.find({
    currency: {
      $in: [...filteredCoinNames]
    }
  }).then(data => {
    res.send(data);
  });
});

//gets top10 coins with details and imgs
router.get("/top10", (req, res) => {
  Top10.find({}).then(data => {
    filteredCoinNames = data.map(el => {
      return el.currency;
    });
    res.send(data);
  });
});

router.get("/dashboards", (req, res) => {
  CoinDashboard.find({
    currency: {
      $in: [...filteredCoinNames]
    }
  }).then(result => {
    res.send(result);
  });
});

router.post("/addcoin", (req, res) => {
  const {
    email,
    coin,
    price_current,
    target_price1,
    target_price2,
    telegram_track,
    slack_track
  } = req.body;
  TrackedCoins.findOneAndUpdate(
    {
      email,
      coin
    },
    {
      email,
      coin,
      price_current,
      target_price1,
      target_price2,
      telegram_track,
      slack_track
    },
    { upsert: true }
  ).then();
  res.send("ok");
});

router.get("/trackedCoins/:email", (req, res) => {
  const email = req.params.email;
  TrackedCoins.find({
    email
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
