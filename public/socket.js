/**
 * Created by versc on 4-5-2017.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});

var lat,lng;
var check = false;
var map;

function myMap(lat , lng) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: 'Raspberry located here.'
    });

    marker.setMap(map);
    }

var socket = io.connect('http://81.165.234.45');
socket.on('connect', function() {
console.log("connected");
});



socket.on("sendData",function(data){
  document.getElementById("air").style="height:"+ data[0].Airquality +"%;";
  document.getElementById("hum").style="height:"+ data[0].Humidity +"%;";
  var light=data[0].Light /10; // schaal van 1000=100%;
    document.getElementById("light").style="height:"+ light +"%;";
    document.getElementById("tempvalue").innerHTML = data[0].Temperature + "°C";
    document.getElementById("lightvalue").innerHTML = data[0].Light + "lux";
    document.getElementById("humvalue").innerHTML = data[0].Humidity + "%";
    document.getElementById("airvalue").innerHTML = data[0].Airquality + "%";
    var tempAbs=Math.abs(data[0].Temperature); // absolute waarde dus zonder -
    var tempHeight;
if (data[0].Temperature<0){
  tempHeight = 50 - tempAbs;
}else{
  tempHeight = 50+tempAbs;
}
lat = data[0].Latitude;
lng = data[0].Longtitude;


//console.log(lat);
//console.log(lng);




    if (lat !== null && lng !== null && check === false){
        myMap(lat,lng);
        check = true;
    }else{

    }


    document.getElementById("temp").style="height:"+ tempHeight +"%;";

});
