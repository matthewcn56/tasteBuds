#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SPI.h>
#include <MFRC522.h>
#include "secrets.h"
#define RST_PIN         22         // Configurable, see typical pin layout above
#define SS_PIN          21         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance
FirebaseData fbdo;
FirebaseJson json;
String ID;
String diningHall = "De Neve";
bool finished1 = false;
bool finished2 = false;
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
    
    SPI.begin();            // Init SPI bus
    mfrc522.PCD_Init();     // Init MFRC522
    delay(4);               // Optional delay. Some board do need more time after init to be ready, see Readme

  //3. Set your Firebase info

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  //4. Enable auto reconnect the WiFi when connection lost
  Firebase.reconnectWiFi(true);
  
  touchAttachInterrupt(T0, touched, 30);
}

void pushStringToDatabase(void *param) {
    Firebase.setString(fbdo, (String)("/IDNumbers/" + ID), ID);
    finished1 = true;
    vTaskDelete(NULL);
}

void printToOLED(void *param) {
    Serial.println(ID);
    finished2 = true;
    vTaskDelete(NULL);
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
        Firebase.setString(fbdo, "/capacities/" + diningHall + "/" + ID + "/", "anonymous");
        //Clear Screens
        capSenseEnabled = false;
        capSenseTouched = false;
    }
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
        ID = getID();
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
                    Firebase.setBool(fbdo, "/users/" + key + "/currHall/", false); //Change current hall to false
                    Firebase.deleteNode(fbdo, "/capacities/" + diningHall + "/" + key); //Get rid of person from dining hall
                }
                else {
                    //Keep this single threaded for now
                    Firebase.setString(fbdo, "/users/" + key + "/currHall/", diningHall); //Change current hall to De Neve
                    Firebase.setString(fbdo, "/capacities/" + diningHall + "/" + key, value);  //Add user to dining hall
                }
            }
            //Add new user
            else {
                capSenseEnabled = true;
                /*
                xTaskCreatePinnedToCore(pushStringToDatabase, "Pushing", 5000, NULL, 1, NULL, 0);
                xTaskCreatePinnedToCore(printToOLED, "Printing to OLED", 5000, NULL, 1, NULL, 1);
                while (!finished1 || !finished2) {
        
                }
                finished1 = false;
                finished2 = false;
                */
            }
        }
    }
    delay(500);
}
