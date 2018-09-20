const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinHistorySchema = new Schema({
  currency: {
    type: String
  },
  day: {
    type: Object
  },
  week: {
    type: Object
  },
  month: {
    type: Object
  },
  year: {
    type: Object
  }
});

module.exports = mongoose.model("CoinHistory", coinHistorySchema);
