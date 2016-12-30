'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _voice = require('./../services/voice.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var hostname = 'localhost';
var port = 3007;
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/api/voice/talk/:msg', function (req, res) {
  var msg = req.params.msg;
  _voice.Voice.talk(msg);
  res.send('Hello World');
});
app.listen(port, function (error) {
  console.info('==> \uD83C\uDF0E  Open up http://' + hostname + ':' + port + '/ in your browser.');
});