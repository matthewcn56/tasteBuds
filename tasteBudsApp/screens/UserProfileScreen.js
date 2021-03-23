import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { db } from "../firebase/firebaseFunctions";
import styles from "../styles.js";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function UserProfileScreen() {
  const { user } = useContext(AuthContext);
  const [list, setList] = React.useState(null);
  const [displayedItems, setDisplayedItems] = React.useState([]);

  useEffect(() => {
    console.log("user's uid is " + user.uid);
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        console.log("snapshot exists!");
        console.log(querySnapshot.val());
        setList(querySnapshot.val());
      } else {
        console.log("snapshot doesn't exist?");
        setList(null); //IS THIS CORRECT
      }
    };
    db.ref("friends/" + user.uid).on("value", onValueChange);

    return () => {
      db.ref("friends/" + user.uid).off("value", onValueChange);
    };
  }, []);

  useEffect(() => {
    //console.log("The uid changed!");
    console.log("The UID is " + user.uid);
  }, [user.uid]);

  useEffect(() => {
    console.log("The list changed!");
    if (list) {
      Object.keys(list).map((section) => {
        let friendName;
        console.log("current section is " + section);
        db.ref("users/" + section + "/displayName")
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("snapshot exists!");
              friendName = snapshot.val();
              console.log(snapshot.val());
              setDisplayedItems((displayedItems) => {
                return [
                  ...displayedItems,
                  <Text key={section}>{friendName}</Text>,
                ];
              });
            } else {
              console.log("snapshot doesn't exist?");
              setList(null); //IS THIS CORRECT
            }
          });
      });
    } else {
      console.log("list is null");
      setDisplayedItems([]);
    }
  }, [list]);

  //let displayedItems = null;
  return (
    <View style={styles.container}>
      <QRCode value={user.uid} />
      <Text>Your List</Text>
      <Text>{displayedItems ? displayedItems : "null"} </Text>
    </View>
  );
}
