const mongoose = require('mongoose');

// I am using mongodb cluster online 
mongoose.connect('mongodb://localhost:27017/usersdb',
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection
module.exports = db
