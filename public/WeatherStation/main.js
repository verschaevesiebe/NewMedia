document.addEventListener("DOMContentLoaded", function() {
    LoadInitialData();
    window.setInterval(LoadData, 60000);
});

var lat, lng, air, hum, temp, light, press, time, labels;
var HumChart = new Chart();
var AirChart = new Chart();
var LightChart = new Chart();
var TempChart = new Chart();
var PressChart = new Chart();

function LoadInitialData()
{
    console.log("loading data");

    $.ajax({
        url: "../api/lasthour",
        type: "GET",
        dataType: "json",
        success: function (data) {
            ParseInitialData(data);
        },
        error: function()
        {
            ErrorLoadingData()
        }
    });
}

function LoadData()
{
    console.log("loading data");

    $.ajax({
        url: "../api/lasthour",
        type: "GET",
        dataType: "json",
        success: function (data) {
            ParseData(data);
        },
        error: function()
        {
            ErrorLoadingData()
        }
    });
}

function GetLocation(lat, lng)
{
    var query = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat + "," + lng +"&key=AIzaSyAgvXxPoCzUH_xcartL6UhkbkyE6uDeqxs";

    $.ajax({
        url: query,
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            ParseLocation(data);
        },
        error: function()
        {
            ErrorLoadingData()
        }
    });
}

function ParseLocation(data)
{
    var span = document.getElementById("LocationName");
    span.innerText = data["results"][1]["formatted_address"];
}

function ParseInitialData(data)
{
    lat = [];lng = [];air = [];hum = [];temp = [];light = [];press = []; time = []; labels = [];

    GetLocation(data[data.length - 1]["Latitude"], data[data.length - 1]["Longtitude"]);

    for(var i = 0; i < data.length; i++)
    {
            lat.push(data[i]["Latitude"]);
            lng.push(data[i]["Longtitude"]);
            air.push(data[i]["Airquality"]);
            hum.push(data[i]["Humidity"]);
            temp.push(data[i]["Temperature"]);
            light.push(data[i]["Light"]);
            press.push(data[i]["Pressure"]);
            time.push(data[i]["Date"]);
    }



    GenerateLabels(data,time);
    DrawCharts();
}

function ParseData(data)
{
    air = [];hum = [];temp = [];light = [];press = [];labels = [];time = [];

    for(var i = 0; i < data.length; i++)
    {
        air.push(data[i]["Airquality"]);
        hum.push(data[i]["Humidity"]);
        temp.push(data[i]["Temperature"]);
        light.push(data[i]["Light"]);
        press.push(data[i]["Pressure"]);
        time.push(data[i]["Date"]);
    }

    GenerateLabels(data, time);

    HumChart.data.datasets["0"].data = hum;
    HumChart.data.labels = labels;
    HumChart.update();

    AirChart.data.datasets["0"].data = air;
    AirChart.data.labels = labels;
    AirChart.update()

    LightChart.data.datasets["0"].data = light;
    LightChart.data.labels = labels;
    LightChart.update();

    TempChart.data.datasets["0"].data = temp;
    TempChart.data.labels = labels;
    TempChart.update();

    PressChart.data.datasets["0"].data = press;
    PressChart.data.labels = labels;
    PressChart.update();


}

function GenerateLabels(data,time)
{
    var d = new Date(time[time.length - 1] * 1000);
    for(var i = 0; i < data.length; i++)
    {
        labels[i] = GetLabel(d.getHours(),d.getMinutes(), i);
    }
    labels.reverse();
    //console.log(labels);
}

function GetLabel(hour, minutes,i)
{


    if (minutes - i < 0){
        var hours = hour - 1;
        var minutes = minutes - i;
        var minutesminhour = minutes + 60;
        return hours + ":" + minutesminhour;

    }else{
        var hours = hour ;
        var minutes = minutes - i;
        if(minutes < 10)
        {
            return hours + ":0" + minutes;
        }
        else
        {
            return hours + ":" + minutes;
        }

    }

//console.log(hour,minutes - i)
    /*if (i === 0){
        return hour - 1 + ":" + minutes;
    }else if (i === 10){
        return hour - 1  + ":" + i;
    }else if (i === 20){
        return hour - 1  + ":" + i;
    }else if (i === 30){
        return hour - 1 + ":" + i;
    }else if (i === 40){
        return hour - 1 + ":" + i;
    }else if (i === 50){
        return hour - 1 + ":" + i;
    }else if (i === 60){
        return hour + ":" + minutes;
    }else{
        return "";
    }*/

/*if (i !== 12 && i !== 0 && i !== 1){
    return hour + ":" + i ;
}else if ( i === 12){
    return hour + 1 + ":00";
}else if (i === 0 || i === 1){
    return hour + ":" + "0" + i;
}*/

}

function ErrorLoadingData()
{
    console.log("Error loading data");
}

function DrawCharts()
{
    var humCanvas = document.getElementById("HumChart");
    var airCanvas = document.getElementById("AirChart");
    var lightCanvas = document.getElementById("LightChart");
    var tempCanvas = document.getElementById("TempChart");
    var pressCanvas = document.getElementById("PressChart");

    HumChart = new Chart(humCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidity',
                data: hum,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        },
        options: {
            elements: { point: { radius: 0 }},
            responsive :false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    AirChart = new Chart(airCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Air quality',
                data: air,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: { point: { radius: 0 }},
            responsive :false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    LightChart = new Chart(lightCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Light intensity',
                data: light,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: { point: { radius: 0 }},
            responsive :false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    TempChart = new Chart(tempCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: temp,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: { point: { radius: 0 }},
            responsive :false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    PressChart = new Chart(pressCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Air pressure",
                data: press,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: { point: { radius: 0 }},
            responsive :false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
