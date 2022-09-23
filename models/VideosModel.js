const mongoose = require('mongoose');
const db = require('../config/DB')

const Videos = new mongoose.Schema({
  categoryID: {
    type: String,
  },
  videos: {
    type: Array,
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

const VideosModel = mongoose.model("Videos", Videos);
module.exports = VideosModel;