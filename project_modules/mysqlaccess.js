var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'HowestRules',
    database : 'NMCTData'
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
    console.log("Connectie gestart");
}

