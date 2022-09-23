const mongoose = require('mongoose');
const db = require('../config/DB')

const User = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  refercode: {
    type: String,
  },
  ownerReferCode: {
    type: String,
  },
  loginType: {
    type: String,
  },
  otp: {
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

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
