var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '192.168.0.170',
  user     : 'station1',
  password : 'Emericjood1',
  database : 'db_weatherstation'
});

module.exports = {
    getConnection : function(){
        connection.connect();
        return connection;
    }
};

/*     ////--- DEBUGGER -----/////
connection.connect(function (error) {
    if(!!error){
        console.log(error);
    }else{
        console.log("Connected");
    }
});
 */
if (connection){
    console.log("Dikke Connectie gestart");
}

