const mongoose = require("mongoose");
const db = require("../config/DB");

const Download = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: {
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

const DownloadModel = mongoose.model("download", Download);
module.exports = DownloadModel;
