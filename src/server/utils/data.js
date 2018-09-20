const axios = require("axios");
const config = require("../config");
const CronJob = require("cron").CronJob;
const Sparklines = require("../models/Sparklines");
const CoinHistory = require("../models/CoinHistory");

let data = [];

new CronJob(
  "*/5 * * * * *",
  function() {
    axios
      .get(`http://localhost:3000/api/coin/prices`)
      .then(result => {
        data = result.data;
      })
      .catch(error => {
        console.log(error);
        res.send("error");
      });
  },
  null,
  true,
  "Europe/Berlin"
);

new CronJob(
  "* * */1 * * *",
  function() {
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
          CoinHistory.findOneAndUpdate(
            { currency: el },
            {
              currency: el,
              day: {
                timestamps: history.day[0].timestamps,
                closes: history.day[0].closes
              },
              week: {
                timestamps: history.week[0].timestamps,
                closes: history.week[0].closes
              },
              month: {
                timestamps: history.month[0].timestamps,
                closes: history.month[0].closes
              },
              year: {
                timestamps: history.year[0].timestamps,
                closes: history.year[0].closes
              }
            },
            { upsert: true }
          ).then();
        });
      })
      .catch(error => {
        console.log(error);
        res.send("error");
      });
  },
  null,
  true,
  "Europe/Berlin"
);

function getPrices() {
  return data;
}

module.exports = getPrices;
