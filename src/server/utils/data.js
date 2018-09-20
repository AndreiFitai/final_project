const axios = require("axios")
const config = require("../config")
const CronJob = require("cron").CronJob

let data;


new CronJob('* * * * * *', function () {
  axios.get(`https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`).then(result => {
    data = result.data
  }).catch(error => {
    console.log(error);
    res.send('error')
  });
}, null, true, 'America/Los_Angeles');

function priceData() {
  console.log(data)
  return data
}

module.exports = {
  priceData
}