const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricesSchema = new Schema({
  prices: {
    type: Array,
    currency: {
      type: String
    },
    price: {
      type: Number
    }
  }
});

module.exports = mongoose.model("Prices", pricesSchema);
