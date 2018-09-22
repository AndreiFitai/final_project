const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricesSchema = new Schema({
  prices: {
    type: Array,
  }
});

module.exports = mongoose.model("Prices", pricesSchema);