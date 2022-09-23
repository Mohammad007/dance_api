const mongoose = require("mongoose");
const db = require("../config/DB");

const ReferIncome = new mongoose.Schema({
  refercode: {
    type: String,
  },
  totalTime: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

const ReferIncomeModel = mongoose.model("referincome", ReferIncome);
module.exports = ReferIncomeModel;
