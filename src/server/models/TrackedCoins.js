const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackedCoinsSchema = new Schema({
  email: {
    type: String
  },
  coin: {
    type: String
  },
  price_current: {
    type: String
  },
  target_price: {
    type: String
  },
  telegram_track: {
    type: Boolean
  },
  slack_track: {
    type: Boolean
  }
});

module.exports = mongoose.model("TrackedCoins", trackedCoinsSchema);