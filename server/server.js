// import Express from 'express';
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require("body-parser");

var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Connection
mongoose.connect('mongodb://localhost/DAS_MOCK_DATA');
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://127.0.0.1:27017/DAS_MOCK_DATA');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// mongoose.connect('mongodb://localhost/DAS_MOCK_DATA');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

var controllerObj;
fs.readdir(__dirname+"/controllers",function(err, files){
   if (err) {
      return console.error(err);
   }
   files.forEach( function (file){
      console.log( "Reading a File - "+ file );
      controllerObj = require(__dirname +'/controllers/' + file);
      controllerObj.controller(app);
   });
});

app.listen(7777, function () {
  console.log("Started listening on port", 7777);
})