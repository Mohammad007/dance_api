const mongoose = require("mongoose");
const db = require("../config/DB");

const Studio = new mongoose.Schema({
  studioName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  status: {
    type: String,
    default: "Active",
  },
  // banner: {
  //   type: String,
  // },
  images: {
    type: Array,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const StudioModel = mongoose.model("studio", Studio);
module.exports = StudioModel;
