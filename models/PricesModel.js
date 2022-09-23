const mongoose = require("mongoose");
const db = require("../config/DB");

const Prices = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  price: {
    type: String,
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

const PricesModel = mongoose.model("prices", Prices);
module.exports = PricesModel;