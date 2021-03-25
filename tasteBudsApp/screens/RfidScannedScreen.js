import React, { useContext, useState, useEffect, useCallback } from "react";

import styles from "../styles";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase/firebaseFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import VerticalSlider from "rn-vertical-slider";

export default function RfidScannedScreen(props) {
  const {
    user,
    logout,
    hasCameraPermission,
    setHasCameraPermission,
  } = useContext(AuthContext);
  const [scanned, setScanned] = useState(false);
  const [renderScanner, setRenderScanner] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const [zoom, setZoom] = useState(0.1);

  //Activate rendering scanner when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setRenderScanner(true);
      setZoom(sliderValue / 100);
      return () => {
        //when screen is not focused
        setRenderScanner(false);
        setZoom(sliderValue / 100);
      };
    }, [sliderValue])
  );

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data === "" || data.includes(".", "#", "$", "[", "]"))
      alert("Invalid QR Code");
    else {
      db.ref("users/" + data)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            alert("Invalid Bruin Card, You Scanned A User!");
          } else {
            db.ref("rfidTags/" + user.uid).set(data);
            alert("Paired With Your Bruin Card!");
            props.navigation.navigate("Dining Halls");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    // db.ref("rfidTags/" + user.uid).set(data);
    // alert("Paired With Your Bruin Card!");
    // db.ref("rfidTags/" + user.uid)
    //   .once("value")
    //   .then((snapshot) => {
    //     // user/uid/displayname
    //     if (snapshot.exists()) {
    //       alert(`${snapshot.val()} has been added to your friends list!`);
    //       // add to database
    //       var updates = {};
    //       updates["friends/" + user.uid + "/" + data] = true; //adds the uid to the friends tree
    //       updates["friends/" + data + "/" + user.uid] = true;
    //       return db.ref().update(updates);
    //     } else {
    //       alert("Invalid QR Code");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    //}
  };

  return (
    <View>
      <View style={styles.scanner}>
        {renderScanner ? (
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            zoom={zoom}
          />
        ) : null}

        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text style={styles.scanAgainMsg}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.scannerHeader}>
        <Image
          style={styles.headerImg}
          source={require("../assets/TasteBuds.png")}
        />
        <Image
          style={styles.headerTxtBubbleRFID}
          source={require("../assets/textBubbleRFID.png")}
        />
        <View style={styles.scannerSliderContainer}>
          <VerticalSlider
            value={sliderValue}
            disabled={false}
            min={0}
            max={100}
            onChange={(value) => {
              setSliderValue(value);
            }}
            onComplete={(value) => {
              console.log("COMPLETE", value);
            }}
            width={styles.scannerSlider.width}
            height={styles.scannerSlider.height}
            step={1}
            borderRadius={5}
            minimumTrackTintColor={styles.scannerSlider.color}
            maximumTrackTintColor={styles.scannerSlider.backgroundColor}
            borderRadius={styles.scannerSlider.borderRadius}
          />
        </View>
      </View>
    </View>
  );
}
