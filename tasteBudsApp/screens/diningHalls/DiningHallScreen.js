import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles.js";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { db } from "../../firebase/firebaseFunctions.js";
import Slider from "react-native-slider";
import { WebView } from "react-native-webview";
import DiningHallMenu from "./DiningHallMenu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DiningHallScreen(props) {
  const [renderFriendImages, setRenderFriendImages] = useState([]);
  const [renderFriendNames, setRenderFriendNames] = useState([]);
  const {
    hallName,
    friendsInHall,
    capacity,
    activityLevel,
  } = props.route.params;

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
            style={styles.IDHPic}
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
          <Text style={styles.IDHfriends} key={friendsInHall[index]}>
            {snapshot.val()}
          </Text>
        ))
      );
    });
  }, [friendsInHall]);

  return (
    <SafeAreaView style={styles.containerscroll}>
      <ScrollView contentContainerStyle={styles.scroll} key={hallName}>
        <View style={styles.IDHContainer}>
          {/* <Text>{hallName}</Text> */}

          <View style={styles.IDHTimeRow}>
            <MaterialCommunityIcons
              name="clock-time-four"
              color={styles.signinButton.borderColor}
              size={1.4 * styles.regText.fontSize}
            />
            <Text style={styles.regText}> {activityLevel} Activity </Text>
          </View>

          <Text style={styles.regText}>{capacity} / 900</Text>
          <Slider
            style={styles.IDHSlider}
            value={capacity}
            minimumValue={0}
            maximumValue={900}
            disabled={true}
            minimumTrackTintColor={styles.DHCardSlider.color}
            maximumTrackTintColor={styles.DHCardSlider.backgroundColor}
            thumbStyle={{ display: "none" }}
          />

          <Text style={styles.IDHNumOfFriends}>
            {friendsInHall.length} friends
          </Text>
          <View style={styles.IDHFriendList}>
            <View>{renderFriendImages}</View>
            <View>{renderFriendNames}</View>
          </View>
          <DiningHallMenu hallName={hallName} />
          {/* <WebView source={{ uri: 'https://web.archive.org/web/20200219143919/http://menu.dining.ucla.edu/Menus/Today' }} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
