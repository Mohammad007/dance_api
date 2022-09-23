const mongoose = require('mongoose');
const db = require('../config/DB')

const Contact = new mongoose.Schema({
  mobile: {
    type: String,
  },
  msg: {
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

const ContactModel = mongoose.model("contact", Contact);
module.exports = ContactModel;