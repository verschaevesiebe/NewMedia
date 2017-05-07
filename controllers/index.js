
var airapi = require('./airapi.js');

 var serialport = require("./serial.js");

module.exports.set = function(app,fs,conn){
    airapi.set(app,conn);
    serialport.set(app,conn,fs);
};
