import express from 'express';
import {Voice} from './../services/voice.js';

const app      = express();
const hostname = 'localhost';
const port     = 3007;
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/api/voice/talk/:msg', function (req, res) {
	var msg = req.params.msg;
	Voice.talk(msg)
  res.send('Hello World');
});
app.listen(port, function (error) { 
    console.info(`==> 🌎  Open up http://${hostname}:${port}/ in your browser.`);
});