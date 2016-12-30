'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _led = require('./../services/led.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var hostname = 'localhost';
var port = 3007;

app.use(_express2.default.static('client'));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname + '/../client/index.html'));
});
app.get('/api/led/:color', function (req, res) {
  var color = req.params.color;
  res.send(_led.Led.turnOn(color));
});
app.listen(port, function (error) {
  console.info('==> \uD83C\uDF0E  Open up http://' + hostname + ':' + port + '/ in your browser.');
});