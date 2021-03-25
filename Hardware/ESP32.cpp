#include <qrbits.h>
#include <qrcode.h>
#include <qrencode.h>
#include <WiFi.h>
#include <Wire.h>
#include <FirebaseESP32.h>
#include <SPI.h>
#include <MFRC522.h>
#include "Adafruit_SSD1306.h"
#include <LiquidCrystal.h>
#include "secrets.h"
#define RST_PIN         2
#define SS_PIN          15
#define OLED_RESET -1 
#define SCREEN_WIDTH 128 
#define SCREEN_HEIGHT 64 

MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal lcd(13, 12, 14, 27, 26, 25);
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
QRcode qrcode (&display);
FirebaseData fbdo;
FirebaseJson json;
String ID;
String diningHall = "De Neve";
bool capSenseTouched = false;
bool capSenseEnabled = false;

void touched() {
    if (capSenseEnabled) {
        capSenseTouched = true; 
    }
}

void setup()
{
  Serial.begin(115200);
  delay(1000);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  
  SPI.begin(); //Initialize SPI
  mfrc522.PCD_Init(); //Initialize MFRC
  delay(4);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  touchAttachInterrupt(T0, touched, 30);

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)


    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C))
    {
      Serial.println(F("SSD1306 allocation failed"));
      for (;;)
        ; // Don't proceed, loop forever
    }
    display.clearDisplay();
    display.display();

    // Initialize QRcode display using library
    //only do once in the run once part
    qrcode.init();
    lcd.begin(16, 2);
    // create qrcode
    ledcSetup(0, 392, 8);
    ledcAttachPin(5, 0);
}

void pushStringToDatabase() {
    if (Firebase.setString(fbdo, "/capacities/" + diningHall + "/" + ID + "/", "anonymous")) {
            
    }
    else {
       Serial.println("ERROR D:");
    }
    //vTaskDelete(NULL);
}

void printToOLED() {
    qrcode.create(ID);
    //vTaskDelete(NULL);
}

void printToLCD() {
    lcd.print("Scan the QR code");
    lcd.setCursor(0, 1);
    lcd.print("Tap when done!");
    //vTaskDelete(NULL);
}

String getID(){
    String userid;
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      userid += String(mfrc522.uid.uidByte[i], HEX);
    }
    return userid;
}

void loop()
{
    if (capSenseTouched) {
        Serial.println("Sensed!");
        display.clearDisplay();
        display.display();
        lcd.clear();
        capSenseEnabled = false;
        capSenseTouched = false;
    }
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
        ledcWriteTone(0, 390);
        delay(100);
        ledcWrite(0, 0);
        ledcWriteTone(0, 523);
        delay(75);
        ledcWrite(0, 0);
        display.clearDisplay();
        display.display();
        lcd.clear();
        ID = getID();
        Serial.println(ID);
        //Check if anonymous user is in dining hall
        if (Firebase.getString(fbdo, "/capacities/" + diningHall + "/" + ID + "/")) {
            Firebase.deleteNode(fbdo, "/capacities/" + diningHall + "/" + ID + "/");
        }
        else {
            //Check if user is in the database
            Firebase.getJSON(fbdo, "/rfidTags/");
            FirebaseJson &json = fbdo.jsonObject();
            size_t len = json.iteratorBegin();
            String key, value = "";
            int type = 0;
            boolean isRegistered = false;
            for (size_t i = 0; i < len; i++)
            {
                  json.iteratorGet(i, type, key, value);
                  if (value == ID) {
                    isRegistered = true;
                    break;
                  }
            }
            json.iteratorEnd();
            //User is already registered
            if (isRegistered) {
                Serial.println("Found in list of RFID");
                boolean isPresent = false; //User is currently in dining hall, swiping out
                if (Firebase.getJSON(fbdo, "/capacities/" + diningHall + "/")) {
                    FirebaseJson &json2 = fbdo.jsonObject();
                    size_t length2 = json2.iteratorBegin();
                    String key2, value2 = "";
                    int type2 = 0;
                    for (size_t i = 0; i < length2; i++)
                    {
                          json2.iteratorGet(i, type2, key2, value2);
                          if (value2 == ID) {
                            isPresent = true;
                            break;
                          }
                    }
                }
                if (isPresent) {
                    Firebase.deleteNode(fbdo, "/users/" + key + "/currHall/"); //Change current hall to false
                    Firebase.deleteNode(fbdo, "/capacities/" + diningHall + "/" + key); //Get rid of person from dining hall
                }
                else {
                    //Keep this single threaded for now
                    Firebase.setString(fbdo, "/users/" + key + "/currHall/", diningHall); //Change current hall to De Neve
                    Firebase.setString(fbdo, "/capacities/" + diningHall + "/" + key, value);  //Add user to dining hall
                    lcd.print("Enjoy your meal");
                    lcd.setCursor(0, 1);
                    String name;
                    Firebase.getString(fbdo, "/users/" + key + "/displayName/", name);
                    String firstName = "";
                    for (auto x : name) {
                        if (x == ' ') {
                            break;
                        }
                        firstName += x;
                    }
                    lcd.print(firstName);
                }
            }
            //Add new user
            else {
                capSenseEnabled = true;
                /*
                xTaskCreatePinnedToCore(pushStringToDatabase, "Pushing", 5000, NULL, 1, NULL, 0);
                xTaskCreatePinnedToCore(printToOLED, "Printing to OLED", 10000, NULL, 1, NULL, 1);
                xTaskCreatePinnedToCore(printToLCD, "Printing to LCD", 10000, NULL, 1, NULL, 0);
                */
                pushStringToDatabase();
                printToOLED();
                printToLCD();
            }
        }
    }
    delay(500);
}
