module.exports.set = function(app,conn){
  var SerialPort = require('serialport');

    var details = [];
    var i = 0;
  var parsers = SerialPort.parsers;

  var port = new SerialPort('/dev/ttyUSB0', {
    baudrate: 9600,
    parser: parsers.readline('\r\n')
  });

  port.on('open', function() {
    console.log('Port open');
  });


  port.on('data', function(data) {


    data=data.substr(0,data.length -1);


    //console.log(data);
    var parts = data.split(":");
    //  console.log(parts[0] + ":" + parts[1]);

    switch(parts[0]){
        case "LATITUDE":
            details['Latitude'] = parts[1];
            break;
        case "LONGITUDE":
            details['Longtitude'] = parts[1];
            break;
        case "licht":
            details['Airquality'] = parts[1];
            break;
        case "lucht":
            details['Light'] = parts[1];
            break;
        case "temp":
            details['Temperature'] = parts[1];
            break;
        case "press":
            details['Pressure'] = parts[1];
            break;
        case "vocht":
            details['Humidity'] = parts[1];

            break;
    }



    if (Object.keys(details).length === 7){
        Sendtodatabase(details);
        details = [];
    }

    /*if (latitude && longtitude !== null){
        if (light !== null){
            console.log("----------------------gfsdgsdg------------------------");
        }else{
            console.log("WHATDAGHEEEELLLL");
        }

    }*/
  });

function Sendtodatabase(detailarray){
    console.log("send");
    detailarray['Date'] = new Date().getTime();
     /*var sql = "INSERT INTO weather_table (`Latitude`,`Longtitude`,`Light`,`Airquality`,`Temperature`,`Pressure`,`Humidity`,`Date`) VALUES ('" + detailarray['Latitude'] + "','" + detailarray['Longtitude'] + "','" + detailarray['Light'] + "','" + detailarray['Airquality'] + "','" + detailarray['Temperature'] + "','" + detailarray['Pressure'] + "','" + detailarray['Humidity'] + "')";
    conn.query(sql, [detailarray], function(err) {
        if (err) throw err;
        conn.end();
    });
    */

    var sql = "INSERT INTO db_weatherstation.weather_table (`Latitude`,`Longtitude`,`Light`,`Airquality`,`Temperature`,`Pressure`,`Humidity`,`Date`) VALUES ('" + detailarray['Latitude'] + "','" + detailarray['Longtitude'] + "','" + detailarray['Light'] + "','" + detailarray['Airquality'] + "','" + detailarray['Temperature'] + "','" + detailarray['Pressure'] + "','" + detailarray['Humidity'] + "','" + detailarray['Date'] + "')";

    conn.query(sql, function(err, rows, fields) {
     if (!err){
     console.log("Added to database");
     }
     else {
         console.log(err);
     }
     });
}


};



