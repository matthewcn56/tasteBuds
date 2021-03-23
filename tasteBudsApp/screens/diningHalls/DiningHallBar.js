import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {db} from "../../firebase/firebaseFunctions" 
export default function DiningHallBar(props) {

  const [renderFriendImages, setRenderFriendImages] = useState([]);

  useEffect( () => {
    setRenderFriendImages([]);
    props.friendsInHall.map((section) => {
      console.log("current section is " + section);
      db.ref('users/' + section + '/profilePic').once('value').then((snapshot) => {
        if (snapshot.exists()) {
          console.log("current url is " + snapshot.val());
          setRenderFriendImages((renderFriendImages) => {
            return [...renderFriendImages, <Image style={styles.friendImage} source={{ uri: snapshot.val() }} key={snapshot.val()}/>]
          })
        }
      });
    })
  }, []);

  return (
    <View key={props.title}>
      <TouchableOpacity /*onpress={props.navigation.navigate("DSFDS", {key})}*/>
        <Text> {props.title}</Text>
        <Text> {props.waitTime} minutes </Text>
        {renderFriendImages}
      </TouchableOpacity>
    </View>
  );
}
