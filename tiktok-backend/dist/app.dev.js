"use strict";

var express = require('express');

var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8000;

var Videos = require('./api/models/videos');

var Data = require('./data.json');

mongoose.connect('mongodb+srv://davidrakosi:ncWesVNRX05YJa5j@cluster0.nbhzf.mongodb.net/tiktokposts?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
app.use(express.json());
app.get('/', function (req, res) {
  return res.status(200).send('hello world');
});
app.get('/api/v1/posts', function (req, res) {
  res.status(200).send(Data);
});
app.get('/api/v2/posts', function (req, res) {
  Videos.find({}, function (err, videosData) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(videosData);
    }
  });
});
app.post('/api/v2/posts', function (req, res) {
  var dbVideos = req.body;
  Videos.create(dbVideos, function (err, post) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("post data saved: ".concat(post));
    }
  });
});
app.listen(port, function () {
  return console.log("listening on localhost:".concat(port));
});