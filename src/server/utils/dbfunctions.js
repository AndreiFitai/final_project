const axios = require("axios");
const config = require("../config");
const CoinHistory = require("../models/CoinHistory");
const Prices = require("../models/Prices");
const Top10 = require("../models/Top10");

let priceData = [];
let filteredCoinNames = [];

function getPrices() {
  axios
    .get(`https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`)
    .then(result => {
      priceData = result.data.filter(el => {
        return filteredCoinNames.indexOf(el.currency) !== -1;
      }).map((el, index) => {
        if (priceData.length === 0 || priceData[index].price === el.price) {
          el.direction = 'same'
          return el
        } else if (priceData[index].price > el.price) {
          el.direction = 'down'
          return el
        } else {
          el.direction = 'up'
          return el
        }
      });
      Prices.findOneAndUpdate({}, {
        prices: result.data
      }, {
        upsert: true
      }).then()
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
}

function getTop10() {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`
    )
    .then(result => {
      Top10.remove({}).then()
      let data = result.data.Data;
      filteredCoinNames = data.map(el => {
        return el.CoinInfo.Name
      })
      data.forEach(coin => {
        Top10.findOneAndUpdate({
          currency: coin.CoinInfo.Name
        }, {
          currency: coin.CoinInfo.Name,
          data: {
            fullname: coin.CoinInfo.FullName,
            imgUrl: coin.CoinInfo.ImageUrl,
            supply: coin.ConversionInfo.Supply,
            totalVol: coin.ConversionInfo.TotalVolume24H
          }
        }, {
          upsert: true
        }).then();
      });
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
}

function getHistoryData() {
  axios
    .get(`https://api.nomics.com/v1/sparkline?key=${config.NOMICS_API}`)
    .then(result => {
      const coins = result.data["day"].map(el => {
        return el.currency;
      });
      let data = [];
      coins.forEach((el, index) => {
        let history = {};
        history.currency = el;
        for (let key in result.data) {
          history[key] = result.data[key].filter(result => {
            return result.currency == el;
          });
        }
        CoinHistory.findOneAndUpdate({
          currency: el
        }, {
          currency: el,
          day: {
            timestamps: history.day[0] ? history.day[0].timestamps : [],
            closes: history.day[0] ? history.day[0].closes : []
          },
          week: {
            timestamps: history.week[0] ? history.week[0].timestamps : [],
            closes: history.week[0] ? history.week[0].closes : []
          },
          month: {
            timestamps: history.month[0] ? history.month[0].timestamps : [],
            closes: history.month[0] ? history.month[0].closes : []
          },
          year: {
            timestamps: history.year[0] ? history.year[0].timestamps : [],
            closes: history.year[0] ? history.year[0].closes : []
          }
        }, {
          upsert: true
        }).then();
      });
    })
    .catch(error => {
      console.log(error);
      res.send("error");
    });
}

function getPriceData() {
  return priceData;
}

module.exports = {
  getTop10,
  getPrices,
  getHistoryData,
  getPriceData
};