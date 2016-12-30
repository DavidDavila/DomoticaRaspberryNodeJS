import express from 'express';
import path from 'path';
import { Led } from './../services/led.js';

const app      = express();
const hostname = 'localhost';
const port     = 3007;

app.use(express.static('client'));

app.get('/', function (req, res) {
  	res.sendFile(path.join(__dirname + '/../client/index.html'));
});
app.get('/api/led/:color', function (req, res) {
	var color = req.params.color;
	res.send(Led.turnOn(color));
  
});
app.listen(port, function (error) { 
    console.info(`==> 🌎  Open up http://${hostname}:${port}/ in your browser.`);
});