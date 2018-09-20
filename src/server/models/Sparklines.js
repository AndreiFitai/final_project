const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sparklinesSchema = new Schema({
  day: {
    type: Array,
    currency: {
      type: String,
      required: true
    },
    timestamps: {
      type: Array
    },
    closes: {
      type: Array
    }
  },
  week: {
    type: Array,
    currency: {
      type: String,
      required: true
    },
    timestamps: {
      type: Array
    },
    closes: {
      type: Array
    }
  },
  month: {
    type: Array,
    currency: {
      type: String,
      required: true
    },
    timestamps: {
      type: Array
    },
    closes: {
      type: Array
    }
  },
  year: {
    type: Array,
    currency: {
      type: String,
      required: true
    },
    timestamps: {
      type: Array
    },
    closes: {
      type: Array
    }
  }
});

module.exports = mongoose.model("Sparklines", sparklinesSchema);
