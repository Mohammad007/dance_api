const mongoose = require('mongoose');
const db = require('../config/DB')

const Categories = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  titleName: {
    type: String,
  },
  titleImage: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
  },
  timeDate: {
    type: String,
  },
  about: {
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

const CategoriesModel = mongoose.model("categories", Categories);
module.exports = CategoriesModel;