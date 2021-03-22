import React, { useState, useContext, useEffect } from "react";
import {AuthContext} from "../navigation/AuthProvider";
import {db, addToList} from "../firebase/firebaseFunctions" 
import styles from "../styles.js";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function UserProfileScreen() {

  const {user} = useContext(AuthContext);
  const [list, setList] = React.useState({});
  const [listItems, setListItems] = React.useState([]);
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const [uid, setUid] = React.useState("");
  const [item, setItem] = useState("");

  useEffect( () => {
    setUid(user.uid);
    db.ref("list/" + uid).on("value", (querySnapshot) => {
      setList(querySnapshot.val())
    })
  }, []);

  function removeItem(key){
    let removed = db.ref("list/" + uid +"/" +key);
    removed.remove()
    .then(function() {
      console.log("Remove succeeded of " + key)
      console.log(list)
    })
  }

  //Change items List whenever the db value changes
  useEffect( () => {
    setListItems(Object.keys(list));

    setDisplayedItems(
      listItems.map((section) => {
        console.log("current section is " + section)
        return (
            <TouchableOpacity
              onPress ={() => removeItem(section)}
              key = {section}
            >
              <Text>{section}</Text>
            </TouchableOpacity>
        
        )
      })
    )
  }, [list])


  return (
    <View style={styles.container}>
      <Text>Your List</Text>
      <Text>{displayedItems} </Text>
    </View>
  );
}