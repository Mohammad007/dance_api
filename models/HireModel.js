const mongoose = require("mongoose");
const db = require("../config/DB");

const Hireus = new mongoose.Schema({
  imagelist: {
    type: Array,
  },
  profileImage: {
    type: String,
  },
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  about: {
    type: String,
  },
  footerImage: {
    type: String,
  },
  status: {
    type: String,
    default: "Active",
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

const HireModel = mongoose.model("hireus", Hireus);
module.exports = HireModel;