const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackedCoinsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
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
