const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../../config");
const moment = require("moment");
const CoinHistory = require("../../models/CoinHistory");

let filteredCoinNames = [];

//get current prices of all coins
router.get("/prices", (req, res) => {
  axios
    .get(`https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`)
    .then(result => {
      const filteredPrices = result.data.filter(el => {
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
  axios
    .get(
      `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`
    )
    .then(result => {
      const data = result.data.Data;
      const coinData = data.map((el, index) => {
        let coin = {};
        coin.fullName = el.CoinInfo.FullName;
        coin.name = el.CoinInfo.Name;
        coin.img = el.CoinInfo.ImageUrl;
        coin.supply = el.ConversionInfo.Supply;
        coin.totalVolume = el.ConversionInfo.TotalVolume24H;
        return coin;
      });

      filteredCoinNames = data.map(el => {
        return el.CoinInfo.Name;
      });
      res.send(coinData);
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
});

module.exports = router;
