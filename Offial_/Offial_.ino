#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

TinyGPSPlus tinyGPS; // Create a TinyGPSPlus object
SoftwareSerial gpsPort(2, 1); 
Adafruit_BME280 bme; // I2C
int luchtVervuilingSensor = A0;
float lat,lng;
int lichtSensor = A4;
int geluidSensor = A2;

void setup() {
  pinMode(LED1, OUTPUT);
  digitalWrite(LED1, LOW);
  // put your setup code here, to run once:
  Serial.begin(9600);
  gpsPort.begin(9600);
  if (!bme.begin()) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  };
}

void loop() {

        if (analogRead(lichtSensor) > 150){
        digitalWrite(LED1, LOW);
      }else{
          digitalWrite(LED1, HIGH);
        }
        
  smartDelay(60000); 
  printGPSInfo();   

    }
      
static void smartDelay(unsigned long ms)
{
  unsigned long start = millis();
  do
  {
    // If data has come in from the GPS module
    while (gpsPort.available())
      tinyGPS.encode(gpsPort.read()); // Send it to the encode function
    // tinyGPS.encode(char) continues to "load" the tinGPS object with new
    // data coming in from the GPS module. As full NMEA strings begin to come in
    // the tinyGPS library will be able to start parsing them for pertinent info
  } while (millis() - start < ms);
}


  void printGPSInfo()
{
  // Print latitude, longitude, altitude in feet, course, speed, date, time,
  // and the number of visible satellites.
    lat = tinyGPS.location.lat()*1000;
    lng = tinyGPS.location.lng()*1000;
  
      Serial.println("LATITUDE:" + (String)lat + "#");
  Serial.println("LONGITUDE:" + (String)lng + "#");
  Serial.println("licht:" + (String)analogRead(lichtSensor) + "#");
           Serial.println("lucht:" + (String)analogRead(luchtVervuilingSensor) + "#");
           Serial.println("temp:"  + (String)bme.readTemperature() + "#");
           Serial.println("press:" + (String)(bme.readPressure() / 100.0F) + "#");
           Serial.println("vocht:" + (String)bme.readHumidity() + "#");
     
           
}
