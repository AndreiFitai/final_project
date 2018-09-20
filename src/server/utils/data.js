const axios = require("axios");
const config = require("../config");
const CronJob = require("cron").CronJob;

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

function getPrices() {
  return data;
}

module.exports = getPrices;
