var Led = module.exports = {};
Led.turnOn = function(color){
	console.log('led '+color)
	return color+' encendido'
};