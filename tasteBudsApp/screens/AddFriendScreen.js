import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase/firebaseFunctions.js";
import { useFocusEffect } from "@react-navigation/native";
import { render } from "react-dom";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from 'expo-camera';
import { PinchGestureHandler } from 'react-native-gesture-handler';

export default function AddFriendScreen() {
  //const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [renderScanner, setRenderScanner] = useState(false);

  const {
    user,
    setUser,
    logout,
    hasCameraPermission,
    setHasCameraPermission,
  } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  //Activate render scanner when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setRenderScanner(true);
      return () => {
        //when screen is not focused
        setRenderScanner(false);
      };
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //bruh why doesn't js let you leave
    let isDuplicate = false;
    if (data === "" || data.includes(".", "#", "$", "[", "]"))
      alert("Invalid QR Code");
    else {
      db.ref("users/" + data + "/displayName")
        .once("value")
        .then((snapshot) => {
          // user/uid/displayname
          if (snapshot.exists()) {
            //Check if already friend
            db.ref("friends/" + user.uid + "/" + data)
              .once("value")
              .then((duplicateFriend) => {
                if (duplicateFriend.exists()) {
                  alert(`This person is already your friend!`);
                  isDuplicate = true;
                }
              })
              //if the user is not a duplicate friend
              .then(() => {
                if (!isDuplicate) {
                  alert(
                    `${snapshot.val()} has been added to your friends list!`
                  );
                  // add to database
                  var updates = {};
                  updates["friends/" + user.uid + "/" + data] = true; //adds the uid to the friends tree
                  updates["friends/" + data + "/" + user.uid] = true;
                  return db.ref().update(updates);
                }
              });
          } else {
            alert("Invalid Friend Code!");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <View style={styles.scanner}>
        {renderScanner ? (
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            zoom={0.1}
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
          style={styles.headerTxtBubble}
          source={require("../assets/textBubbleFriend.png")}
        />
      </View>
    </View>
  );
}
