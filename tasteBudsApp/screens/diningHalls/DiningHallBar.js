import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Slider from "react-native-slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
            style={styles.DHCardPic}
            source={{ uri: snapshot.val() }}
            key={snapshot.val()}
          />
        ))
      );
    });
  }, [props.friendsInHall]);

  return (
    <View style = {styles.DHCard} key={props.title}>
      <View style = {styles.DHCardRow1}>
        <Text style = {styles.DHCardHeader}>{props.title}</Text>
        <MaterialCommunityIcons
          name="clock-time-four"
          color={styles.signinButton.borderColor}
          size={1.4*(styles.regText.fontSize)}
        />
        <Text style = {styles.regText}>{props.waitTime} minutes </Text>
      </View>

      <Text style = {styles.regText}>{props.friendsInHall.length} friends</Text>
      
      <View style = {styles.DHCardRow3}>{renderFriendImages}</View>
      
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
