const mongoose = require('mongoose');
const db = require('../config/DB')

const UnlimitedPremium = new mongoose.Schema({
  title: {
    type: String,
  },  
  content: {
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

const UnlimitedPremiumModel = mongoose.model("unlimitedpremium", UnlimitedPremium);
module.exports = UnlimitedPremiumModel;