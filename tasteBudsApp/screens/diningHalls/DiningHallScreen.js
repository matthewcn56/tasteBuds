import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles.js";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { db } from "../../firebase/firebaseFunctions.js";
import Slider from "react-native-slider";
import { WebView } from 'react-native-webview';
import DiningHallMenu from "./DiningHallMenu";

export default function DiningHallScreen(props) {
  const [renderFriendImages, setRenderFriendImages] = useState([]);
  const [renderFriendNames, setRenderFriendNames] = useState([]);
  const { hallName, friendsInHall, capacity, waitTime } = props.route.params;

  //render friend images
  useEffect(() => {
    Promise.all(
      friendsInHall.map((session) =>
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
  }, [friendsInHall]);

  // render friend names
  useEffect(() => {
    Promise.all(
      friendsInHall.map((session) =>
        db.ref("users/" + session + "/displayName").once("value")
      )
    ).then((snapshotVals) => {
      setRenderFriendNames(
        snapshotVals.map((snapshot, index) => (
          <Text key={friendsInHall[index]}>{snapshot.val()}</Text>
        ))
      );
    });
  }, [friendsInHall]);

  return (
    <View style={styles.container}>
      <View key={hallName}>
          <Text>{hallName}</Text>
          <Text>{waitTime} minutes </Text>
          <Text>{friendsInHall.length} friends</Text>
          <Text>{capacity} / 900</Text>
          {renderFriendImages}
          {renderFriendNames}
          <Slider
            value={capacity}
            minimumValue={0}
            maximumValue={900}
            disabled={true}
            minimumTrackTintColor="#E7A7D5"
            maximumTrackTintColor="#000000"
            thumbStyle={{display: 'none'}}
          />
          <DiningHallMenu 
            hallName={hallName}
          />
          {/* <WebView source={{ uri: 'https://web.archive.org/web/20200219143919/http://menu.dining.ucla.edu/Menus/Today' }} /> */}
      </View>
    </View>
  );
}
