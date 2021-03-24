import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Slider from "react-native-slider";

export default function DiningHallBar(props) {
  const [renderFriendImages, setRenderFriendImages] = useState([]);

  //render
  useEffect(() => {
    Promise.all(
      props.friendsInHall.map((session) =>
        db.ref("users/" + session + "/profilePic").once("value")
      )
    ).then((snapshotVals) => {
      setRenderFriendImages(
        snapshotVals.map((snapshot) => (
          <Image
            style={styles.friendImage}
            source={{ uri: snapshot.val() }}
            key={snapshot.val()}
          />
        ))
      );
    });
  }, [props.friendsInHall]);

  return (
    <View key={props.title}>
      <Text>{props.title}</Text>
      <Text>{props.waitTime} minutes </Text>
      <Text>{props.friendsInHall.length} friends</Text>
      {renderFriendImages}
      <Slider
        value={props.capacity}
        minimumValue={0}
        maximumValue={900}
        disabled={true}
        minimumTrackTintColor="#E7A7D5"
        maximumTrackTintColor="#000000"
        thumbStyle={{ display: "none" }}
      />
    </View>
  );
}
