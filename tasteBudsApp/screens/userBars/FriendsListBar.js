import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Entypo from "react-native-vector-icons/Entypo";

export default function FriendsListBar(props) {
  const [currHall, setCurrHall] = useState("");
  const [userImage, setUserImage] = useState("");
  //set the value of currHall when the component mounts
  useEffect(() => {
    db.ref("users/" + props.uid + "/currHall")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrHall(snapshot.val());
        }
      });

    db.ref("users/" + props.uid + "/profilePic")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserImage(snapshot.val());
        }
      });
  }, [props.uid]);
  return (
    <View>
      <Text>{props.name} </Text>
      <Text> {currHall ? "currently in " + currHall : ""}</Text>
      <Image style={styles.friendBarImage} source={{ uri: userImage }} />
    </View>
  );
}
