var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(80);
var mysql = require("./project_modules/mysqlaccess.js");
var conn = mysql.getConnection();
io.on('connection', function(socket) {
    console.log("user connected");
    socket.emit('connect', "connected");
    setInterval(function() {
        conn.query('SELECT * FROM NMCTData.nmct_table WHERE ID = (SELECT MAX(ID) FROM NMCTData.nmct_table)', function(err, rows, fields) {
            if (!err && rows.length > 0){
                        socket.emit("sendData", rows);
                
            }
            else if (err) {
            }else if (rows.length == 0){
            }

        });



    }, 10);
});

var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var controllers = require('./controllers');

controllers.set(app, fs,conn);


app.use(express.static('public'));

app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
