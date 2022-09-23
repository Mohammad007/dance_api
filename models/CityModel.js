const mongoose = require('mongoose');
const db = require('../config/DB')

const City = new mongoose.Schema({
  cityName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
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

const CityModel = mongoose.model("city", City);
module.exports = CityModel;