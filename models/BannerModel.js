const mongoose = require('mongoose');
const db = require('../config/DB')

const Banner = new mongoose.Schema({
  image: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  url: {
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

const BannerModel = mongoose.model("banner", Banner);
module.exports = BannerModel;