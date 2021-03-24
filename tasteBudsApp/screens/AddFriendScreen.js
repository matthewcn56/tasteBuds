import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase/firebaseFunctions.js";
import { useFocusEffect } from "@react-navigation/native";
import { render } from "react-dom";
import styles from "../styles";

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
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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
    if (data === "" || data.includes(".", "#", "$", "[", "]"))
      alert("Invalid QR Code");
    else {
      db.ref("users/" + data + "/displayName")
        .once("value")
        .then((snapshot) => {
          // user/uid/displayname
          if (snapshot.exists()) {
            alert(`${snapshot.val()} has been added to your friends list!`);
            // add to database
            var updates = {};
            updates["friends/" + user.uid + "/" + data] = true; //adds the uid to the friends tree
            updates["friends/" + data + "/" + user.uid] = true;
            return db.ref().update(updates);
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
    <SafeAreaView>
      <View style = {styles.scanner}>
      {renderScanner ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      </View>
      
      <View style={styles.scannerHeader}>
        <Image style ={styles.headerImg} source={require("../assets/TasteBuds.png")}/>
        <Text style = {styles.headerTxt}>TasteBuds</Text>
        <View style = {styles.headerImg}/>
      </View>

    </SafeAreaView>
  );
}

