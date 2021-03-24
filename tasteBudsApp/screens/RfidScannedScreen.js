import React, { useContext, useState, useEffect, useCallback } from "react";

import styles from "../styles";
import { SafeAreaView, View, Text, Button, StyleSheet, Image } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase/firebaseFunctions";
import { useFocusEffect } from "@react-navigation/native";

export default function RfidScannedScreen(props) {
  const {
    user,
    logout,
    hasCameraPermission,
    setHasCameraPermission,
  } = useContext(AuthContext);
  const [scanned, setScanned] = useState(false);

  const [renderScanner, setRenderScanner] = useState(false);

  //Activate rendering scanner when the screen is focused
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
    <SafeAreaView>
      <View style ={styles.scanner}>
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
