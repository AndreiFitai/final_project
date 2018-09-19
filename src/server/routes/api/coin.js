const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../../config')
const moment = require('moment')

//get current prices of all coins
router.get('/prices', (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`).then(result => {
    res.send(
      result.data
    )
  }).catch(error => {
    console.log(error);
    res.send('error')
  });
})

//gets historical data of coins -> data is split in days/week/month/year each containing all the coins
router.get('/sparkline', (req, res) => {
  axios.get(`https://api.nomics.com/v1/sparkline?key=${config.NOMICS_API}`).then(result => {
    res.send(
      result.data
    )
  }).catch(error => {
    console.log(error);
    res.send('error')
  });
})

//gets top10 coins with details and imgs
router.get('/top10', (req, res) => {
  axios.get(`https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`).then(result => {
    res.send(
      result.data["Data"]
    )
  }).catch(error => {
    console.log(error);
    res.send('error')
  });
})



module.exports = router