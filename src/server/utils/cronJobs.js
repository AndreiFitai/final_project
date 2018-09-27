const axios = require("axios");
const config = require("../config");
const CronJob = require("cron").CronJob;
const {
  getTop10,
  getPrices,
  getHistoryData,
  getDashboards
} = require("./dbfunctions");
const { checkTrackedCoinsTelegram } = require("./telegramBot");

new CronJob(
  "*/10 * * * * *",
  function() {
    getPrices();
  },
  null,
  true,
  "Europe/Berlin"
);

new CronJob(
  "* */30 * * * *",
  function() {
    checkTrackedCoinsTelegram();
  },
  null,
  true,
  "Europe/Berlin"
);
