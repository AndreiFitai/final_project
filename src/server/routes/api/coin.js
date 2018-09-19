const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../../config')

router.get('/', (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`).then(result => {
    console.log(result)
  })
  res.send('hello')
})


module.exports = router