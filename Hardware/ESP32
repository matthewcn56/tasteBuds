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

void printResult(FirebaseData &data)
{

  if (data.dataType() == "int")
    Serial.println(data.intData());
  else if (data.dataType() == "float")
    Serial.println(data.floatData(), 5);
  else if (data.dataType() == "double")
    printf("%.9lf\n", data.doubleData());
  else if (data.dataType() == "boolean")
    Serial.println(data.boolData() == 1 ? "true" : "false");
  else if (data.dataType() == "string")
    Serial.println(data.stringData());
  else if (data.dataType() == "json")
  {
    Serial.println();
    FirebaseJson &json = data.jsonObject();
    //Print all object data
    Serial.println("Pretty printed JSON data:");
    String jsonStr;
    json.toString(jsonStr, true);
    Serial.println(jsonStr);
    Serial.println();
    Serial.println("Iterate JSON data:");
    Serial.println();
    size_t len = json.iteratorBegin();
    String key, value = "";
    int type = 0;
    for (size_t i = 0; i < len; i++)
    {
      json.iteratorGet(i, type, key, value);
      Serial.print(i);
      Serial.print(", ");
      Serial.print("Type: ");
      Serial.print(type == FirebaseJson::JSON_OBJECT ? "object" : "array");
      if (type == FirebaseJson::JSON_OBJECT)
      {
        Serial.print(", Key: ");
        Serial.print(key);
      }
      Serial.print(", Value: ");
      Serial.println(value);
    }
    json.iteratorEnd();
  }
  else if (data.dataType() == "array")
  {
    Serial.println();
    //get array data from FirebaseData using FirebaseJsonArray object
    FirebaseJsonArray &arr = data.jsonArray();
    //Print all array values
    Serial.println("Pretty printed Array:");
    String arrStr;
    arr.toString(arrStr, true);
    Serial.println(arrStr);
    Serial.println();
    Serial.println("Iterate array values:");
    Serial.println();
    for (size_t i = 0; i < arr.size(); i++)
    {
      Serial.print(i);
      Serial.print(", Value: ");

      FirebaseJsonData &jsonData = data.jsonData();
      //Get the result data from FirebaseJsonArray object
      arr.get(jsonData, i);
      if (jsonData.typeNum == FirebaseJson::JSON_BOOL)
        Serial.println(jsonData.boolValue ? "true" : "false");
      else if (jsonData.typeNum == FirebaseJson::JSON_INT)
        Serial.println(jsonData.intValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_FLOAT)
        Serial.println(jsonData.floatValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_DOUBLE)
        printf("%.9lf\n", jsonData.doubleValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_STRING ||
               jsonData.typeNum == FirebaseJson::JSON_NULL ||
               jsonData.typeNum == FirebaseJson::JSON_OBJECT ||
               jsonData.typeNum == FirebaseJson::JSON_ARRAY)
        Serial.println(jsonData.stringValue);
    }
  }
  else if (data.dataType() == "blob")
  {

    Serial.println();

    for (size_t i = 0; i < data.blobData().size(); i++)
    {
      if (i > 0 && i % 16 == 0)
        Serial.println();

      if (i < 16)
        Serial.print("0");

      Serial.print(data.blobData()[i], HEX);
      Serial.print(" ");
    }
    Serial.println();
  }
  else if (data.dataType() == "file")
  {

    Serial.println();

    File file = data.fileStream();
    int i = 0;

    while (file.available())
    {
      if (i > 0 && i % 16 == 0)
        Serial.println();

      int v = file.read();

      if (v < 16)
        Serial.print("0");

      Serial.print(v, HEX);
      Serial.print(" ");
      i++;
    }
    Serial.println();
    file.close();
  }
  else
  {
    Serial.println(data.payload());
  }
}

void loop()
{
    if (capSenseTouched) {
        Serial.println("Sensed!");
        Firebase.setString(fbdo, "/capacities/De Neve/" + ID + "/", "anonymous");
        //Clear Screens
        capSenseEnabled = false;
        capSenseTouched = false;
    }
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
        ID = getID();
        //Check if user is in the database
        Firebase.getJSON(fbdo, (String) ("rfidTags"));
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
            if (Firebase.getJSON(fbdo, (String) ("/capacities/De Neve/"))) {
                Serial.println("Looking in De Neve");
                FirebaseJson &json2 = fbdo.jsonObject();
                size_t length2 = json2.iteratorBegin();
                String key2, value2 = "";
                int type2 = 0;
                for (size_t i = 0; i < length2; i++)
                {
                      json2.iteratorGet(i, type2, key2, value2);
                      Serial.println(key2 + " " + value2);
                      if (value2 == ID) {
                        isPresent = true;
                        break;
                      }
                }
            }
            if (isPresent) {
                Firebase.setBool(fbdo, "users/" + key + "/currHall/", false); //Change current hall to false
                Firebase.deleteNode(fbdo, "capacities/De Neve/" + key); //Get rid of person from dining hall
            }
            else {
                //Keep this single threaded for now
                Firebase.setString(fbdo, "users/" + key + "/currHall/", "De Neve"); //Change current hall to De Neve
                Firebase.setString(fbdo, "/capacities/De Neve/" + key, value);  //Add user to dining hall
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
    delay(500);
}
