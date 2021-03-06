import React, { useState, useEffect } from "react";
import styles from "../../styles";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Slider from "react-native-slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DiningHallBar(props) {
  const [renderFriendImages, setRenderFriendImages] = useState([]);

  //render
  useEffect(() => {
    Promise.all(
      props.friendsInHall.map((session) =>
        db.ref("users/" + session).once("value")
      )
    ).then((snapshotVals) => {
      let visibleFriends = snapshotVals.filter(f => f.val().optIn);
      setRenderFriendImages(
        // add (snapshot, key) and then return only if key is below certain #
        visibleFriends.map((snapshot, key) => {
          if (key < 8 && snapshot.val()["optIn"]) {
            return (
              <Image
                style={styles.DHCardPic}
                source={{ uri: snapshot.val()["profilePic"] }}
                key={snapshot.val()["uid"]}
              />
            );
          }
          else if (key == 8) {
            return (<View key={8}><Text style={styles.DHCardPfpOverflow}>+ {visibleFriends.length - 8}</Text></View>)
          }
        })
      );
    });
  }, [props.friendsInHall]);

  return (
    <View style={styles.DHCard} key={props.title}>
      <View style={styles.DHCardRow1}>
        <Text style={styles.DHCardHeader}>{props.title}</Text>
        <MaterialCommunityIcons
          name="clock-time-four"
          color={styles.signinButton.borderColor}
          size={1.4 * styles.regText.fontSize}
          style={styles.timeTextIcon}
        />
        <Text style={styles.timeText}> {props.activityLevel} Activity </Text>
      </View>

      <Text style={styles.regText}>{renderFriendImages.length} {renderFriendImages.length == 1 ? "friend" : "friends"}</Text>

      <View style={styles.DHCardRow3}>{renderFriendImages}</View>

      <Slider
        value={props.capacity}
        minimumValue={0}
        maximumValue={900}
        disabled={true}
        minimumTrackTintColor={styles.DHCardSlider.color}
        maximumTrackTintColor={styles.DHCardSlider.backgroundColor}
        thumbStyle={{ display: "none" }}
        thumbImage={{ display: "none" }}
      />
    </View>
  );
}
