const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../../config");
const moment = require("moment");
const CoinHistory = require("../../models/CoinHistory");
const Prices = require("../../models/Prices");
const Top10 = require("../../models/Top10");

let filteredCoinNames = [];

//get current prices of all coins
router.get("/prices", (req, res) => {
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
  CoinHistory.find({ currency: { $in: [...filteredCoinNames] } }).then(data => {
    res.send(data);
  });
});

//gets top10 coins with details and imgs
router.get("/top10", (req, res) => {
  Top10.find({}).then(data => {
    res.send(data);
  });
});

module.exports = router;
