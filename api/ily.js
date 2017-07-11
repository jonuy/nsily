'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  note: String,
});

module.exports = mongoose.model('Ily', schema);
