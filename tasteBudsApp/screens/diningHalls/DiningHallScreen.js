import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles.js";
import { Text, View, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebaseFunctions.js";

export default function DiningHallScreen(props) {
  const [renderFriendImages, setRenderFriendImages] = useState([]);
  const [renderFriendNames, setRenderFriendNames] = useState([]);
  const { hallName, friendsInHall } = props.route.params;

  // FIX ALL VARIABLES/PROPS SO THAT WE ONLY RELY ON hallName

  useEffect(() => {
    setRenderFriendImages([]);
    friendsInHall.map((section) => {
      console.log("current section is " + section);
      db.ref("users/" + section + "/profilePic")
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("current url is " + snapshot.val());
            setRenderFriendImages((renderFriendImages) => {
              return [
                ...renderFriendImages,
                <Image
                  style={styles.friendImage}
                  source={{ uri: snapshot.val() }}
                  key={snapshot.val()}
                />,
              ];
            });
          }
        });
      db.ref("users/" + section + "/displayName")
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("current name is " + snapshot.val());
            setRenderFriendNames((renderFriendNames) => {
              return [
                ...renderFriendNames,
                <Text key={section}>{snapshot.val()}</Text>,
              ];
            });
          }
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View key={hallName}>
        <TouchableOpacity /*onPress={props.navigation.navigate("DSFDS", {key})}*/
        >
          <Text> {hallName}</Text>
          <Text> {props.waitTime} minutes </Text>
          {renderFriendImages}
        </TouchableOpacity>
      </View>
    </View>
  );
}
