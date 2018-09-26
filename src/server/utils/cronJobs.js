const axios = require("axios");
const config = require("../config");
const CronJob = require("cron").CronJob;
const {
  getTop10,
  getPrices,
  getHistoryData,
  getDashboards
} = require("./dbfunctions");
const { sendTest } = require("./telegramBot");

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
  "* * */12 * * *",
  function() {
    getTop10();
  },
  null,
  true,
  "Europe/Berlin"
);

new CronJob(
  "* * */12 * * *",
  function() {
    getDashboards();
  },
  null,
  true,
  "Europe/Berlin"
);

new CronJob(
  "* * */1 * * *",
  function() {
    getHistoryData();
  },
  null,
  true,
  "Europe/Berlin"
);

// new CronJob(
//   "* * */5 * * *",
//   function() {
//     sendTest();
//   },
//   null,
//   true,
//   "Europe/Berlin"
// );
