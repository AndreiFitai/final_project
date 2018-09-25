const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinDashboardSchema = new Schema({
  currency: {
    type: String
  },
  dayOpen: {
    type: String
  },
  dayVolume: {
    type: String
  },
  dayOpenVolume: {
    type: String
  },
  weekOpen: {
    type: String
  },
  weekVolume: {
    type: String
  },
  weekOpenVolume: {
    type: String
  },
  monthOpen: {
    type: String
  },
  monthVolume: {
    type: String
  },
  monthOpenVolume: {
    type: String
  },
  yearOpen: {
    type: String
  },
  yearVolume: {
    type: String
  },
  yearOpenVolume: {
    type: String
  },
  close: {
    type: String
  },
  high: {
    type: String
  },
  highTimestamp: {
    type: String
  },
  highExchange: {
    type: String
  },
  highQuoteCurrency: {
    type: String
  },
  availableSupply: {
    type: String
  },
  maxSupply: {
    type: String
  }
});

module.exports = mongoose.model("CoinDashboard", coinDashboardSchema);
