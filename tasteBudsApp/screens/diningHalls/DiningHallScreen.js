import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../navigation/AuthProvider";
import styles from "../../styles.js";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  SnapshotViewIOS,
} from "react-native";
import { db } from "../../firebase/firebaseFunctions.js";
import Slider from "react-native-slider";
import { WebView } from "react-native-webview";
import DiningHallMenu from "./DiningHallMenu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { render } from "react-dom";

export default function DiningHallScreen(props) {
  const { user, logout } = useContext(AuthContext);
  const [renderFriendImages, setRenderFriendImages] = useState([]);
  const [renderFriendNames, setRenderFriendNames] = useState([]);
  const [numFriends, setNumFriends] = useState(0);
  const {
    hallName,
    // friendsInHall,
    // capacity,
    // activityLevel,
  } = props.route.params;

  const [allUsers, setAllUsers] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [capacities, setCapacities] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [activityLevel, setActivityLevel] = useState("");

  const [mealTimes, setMealTimes] = useState(null);
  const [renderMenuButtons, setRenderMenuButtons] = useState([]);

  // allUsers
  useEffect(() => {
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setAllUsers(querySnapshot.val());
      } else {
        setAllUsers(null);
      }
    };
    db.ref("users/").on("value", onValueChange);

    return () => {
      db.ref("users/").off("value", onValueChange);
    };
  }, []);

  // friends list
  useEffect(() => {
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setFriendList(querySnapshot.val());
      } else {
        setFriendList(null);
      }
    };
    db.ref("friends/" + user.uid).on("value", onValueChange);

    return () => {
      db.ref("friends/" + user.uid).off("value", onValueChange);
    };
  }, []);

  //setup listener for activityLevels to update
  useEffect(() => {
    let onActivityLevelChange = function (snapshot) {
      if (snapshot.exists()) {
        setActivityLevel(snapshot.val());
      } else {
        setActivityLevel("");
      }
    };
    db.ref("activityLevels/" + hallName).on("value", onActivityLevelChange);

    return () => {
      db.ref("activityLevels/" + hallName).off("value", onActivityLevelChange);
    };
  }, []);

  // update capacities
  useEffect(() => {
    let onActivityLevelChange = function (snapshot) {
      if (snapshot.exists()) {
        console.log("capacity changed!");
        setCapacities(snapshot.val());
        setCapacity(Object.keys(snapshot.val()).length);
      } else {
        setCapacities(null);
        setCapacity(0);
      }
    };
    db.ref("capacities/" + hallName).on("value", onActivityLevelChange);

    return () => {
      db.ref("capacities/" + hallName).off("value", onActivityLevelChange);
    };
  }, []);

  // render friend images - UPDATES AFTER BOTH FRIEND'S CURRHALL AND CAPACITY-HALL-FRIENDUID CHANGES
  useEffect(() => {
    if (capacities && friendList) {
      Promise.all(
        Object.keys(friendList).map((friend) =>
          db.ref("users/" + friend).once("value")
        )
      ).then((snapshotVals) => {
        let friends = snapshotVals.filter((snapshot) => {
          return snapshot.val()["currHall"] === hallName && snapshot.val()["optIn"];
        });
        setRenderFriendImages(
          friends.map((snapshot) => (
            <Image
              style={styles.IDHPic}
              source={{ uri: snapshot.val()["profilePic"] }}
              key={snapshot.val()["uid"]}
            />
          ))
        );
        setRenderFriendNames(
          friends.map((snapshot) => (
            <Text style={styles.IDHfriends} key={snapshot.val()["uid"]}>
              {snapshot.val()["displayName"]}
            </Text>
          ))
        );
      });
    } else {
      setRenderFriendNames([]);
      setRenderFriendNames([]);
    }
  }, [capacities, allUsers]);

  // update numFriends
  useEffect(() => {
    if (renderFriendNames) {
      setNumFriends(renderFriendNames.length);
    } else {
      setNumFriends(0);
    }
  }, [renderFriendNames]);

  // update mealTimes
  useEffect(() => {
    db.ref("hours/" + hallName).once("value").then((snapshot) => {
      if (snapshot.exists()) {
        let mealTimes = {};
        let order = ["Breakfast", "Lunch", "Dinner", "Late Night"];
        for (var i = 0; i < order.length; i++)
          if (Object.keys(snapshot.val()).indexOf(order[i]) > -1)
            mealTimes[order[i]] = snapshot.val()[order[i]];
        setMealTimes(mealTimes);
      } else {
        setMealTimes(null)
      }
    })
  }, [])

  // render menu buttons
  useEffect(() => {
    if (mealTimes) {
      setRenderMenuButtons(
        Object.entries(mealTimes).map((mealTime) => {
          let name = mealTime[0]
          let currMealTimes = [mealTime[0]];
          if (mealTime[0] === "Lunch") {
            name = "Lunch/Brunch";
            currMealTimes.push("Brunch");
          }
          return (
            <View style={styles.DHCardRow1} key={`${hallName} ${name} Menu`}>
              <TouchableOpacity
                style = {{flex: 1}}
                onPress={() => {
                  props.navigation.navigate("Menu", {
                    hallName: hallName,
                    currMealName: name,
                    currMealTimes: currMealTimes,
                  });
                }}
              >
                <Text style={styles.IDHMenuButton}>{name}</Text>
              </TouchableOpacity>
              <Text style={styles.IDHMenuHours}>{mealTime[1]}</Text>
            </View>
          );
        })
      )
    } else {
      setRenderMenuButtons([]);
    }
  }, [mealTimes])

  return (
    <SafeAreaView style={styles.containerscroll}>
      <ScrollView contentContainerStyle={styles.scroll} key={hallName}>
        <View style={styles.IDHContainer}>
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
        <Text style={styles.IDHMenu}>Menus</Text>
        {renderMenuButtons}
        <Text style={styles.IDHNumOfFriends}>
          {numFriends} {numFriends == 1 ? "friend" : "friends"}
        </Text>
          <View style={styles.IDHFriendList}>
            <View>{renderFriendImages}</View>
            <View>{renderFriendNames}</View>
          </View>
          {/* <DiningHallMenu hallName={hallName} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
