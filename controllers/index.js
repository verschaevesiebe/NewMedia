var mysql = require("../project_modules/mysqlaccess.js");
var conn = mysql.getConnection();
var airapi = require('./airapi.js');

 var serialport = require("./serial.js");

module.exports.set = function(app){
    airapi.set(app,conn);
    serialport.set(app,conn);
};
