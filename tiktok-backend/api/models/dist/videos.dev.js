"use strict";

var mongoose = require('mongoose');

var videosSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String
}); // Collection

module.exports = mongoose.model('Videos', videosSchema);