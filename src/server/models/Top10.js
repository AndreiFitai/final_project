const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const top10Schema = new Schema({
  currency: {
    type: String
  },
  data: {
    fullname: {
      type: String
    },
    imgUrl: {
      type: String
    },
    supply: {
      type: Number
    },
    totalVol: {
      type: Number
    }
  }
});

module.exports = mongoose.model("Top10", top10Schema);
