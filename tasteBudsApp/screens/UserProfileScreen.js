import React, { useState, useContext, useEffect } from "react";
import {AuthContext} from "../navigation/AuthProvider";
import {db} from "../firebase/firebaseFunctions" 
import styles from "../styles.js";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function UserProfileScreen() {

  const {user} = useContext(AuthContext);
  const [list, setList] = React.useState({});
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const [uid, setUid] = React.useState("");

  useEffect( () => {
    setUid(user.uid);
    db.ref("friends/" + uid).on("value", (querySnapshot) => {
      if (querySnapshot.exists())
        setList(querySnapshot.val())
    })
  }, []);

  //Change items List whenever the db value changes
  useEffect( () => {
    setDisplayedItems(
      Object.keys(list).map((section) => {
        console.log("current section is " + section);
        let name = db.ref('users/' + section + '/displayName').once('value').then((snapshot) => {
          return snapshot.val();
        });
        return (
          <Text>{section}</Text> // try changing to name
        )
      })
    )
  }, [list])


  return (
    <View style={styles.container}>
      <QRCode 
        value = {user.uid}
      />
      <Text>Your List</Text>
      <Text>{displayedItems} </Text>
    </View>
  );
}