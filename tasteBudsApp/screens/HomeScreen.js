import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase/firebaseFunctions";
import DiningHallBar from "./diningHalls/DiningHallBar.js";
import { render } from "react-dom";

export default function HomeScreen(props) {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [friendList, setFriendList] = useState(null);
  const [diningHalls, setDiningHalls] = useState(null);
  const [capacities, setCapacities] = useState([]);
  const [renderDiningHalls, setRenderDiningHalls] = useState([]);
  const [activityLevels, setActivityLevels] = useState(null);

  //set userName on mount
  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, [user.uid]); //ComponentDidMount

  // friends list
  useEffect(() => {
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        console.log("snapshot exists!");
        console.log(querySnapshot.val());
        setFriendList(querySnapshot.val());
      } else {
        console.log("snapshot doesn't exist?");
        setFriendList(null);
      }
    };
    db.ref("friends/" + user.uid).on("value", onValueChange);
  }, []);

  //setup listener for activityLevels to update
  useEffect(() => {
    let onActivityLevelChange = function (snapshot) {
      if (snapshot.exists()) {
        setActivityLevels(snapshot.val());
      } else {
        setActivityLevels(null);
      }
    };
    db.ref("activityLevels/").on("value", onActivityLevelChange);
  }, []);

  // setup listener for diningHalls to update
  useEffect(() => {
    let onCapacityChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setDiningHalls(querySnapshot.val());
      } else {
        setDiningHalls(null);
      }
    };
    db.ref("capacities/").on("value", onCapacityChange);
  }, []);

  //function that uses object destructuring rather than arrays
  function getActivityLevelsFromName(hallName) {
    let key = hallName;
    let value = "ERROR";
    ({ [key]: value } = activityLevels);
    return value;
  }

  // update capacities
  useEffect(() => {
    if (diningHalls) {
      Object.entries(diningHalls).map((value, key) => {
        let currentNum = Object.keys(value[1]).length - 1;
        setCapacities((capacities) => {
          return [...capacities, currentNum];
        });
      });
    } else {
      setCapacities([]);
    }
  }, [diningHalls]);

  // render dining hall components
  useEffect(() => {
    setRenderDiningHalls([]);
    if (diningHalls) {
      Object.entries(diningHalls).map((value, key) => {
        // create friendsInHall array
        let friendsInHall = [];
        // map through all the people in value (except dummyNode)
        Object.keys(value[1]).map((person) => {
          // see if that person is a friend
          if (
            person !== "dummyNode" &&
            friendList &&
            Object.keys(friendList).includes(person)
          ) {
            // add to friendsInHall array
            friendsInHall.push(person);
          }
        });
        // update diningHalls
        setRenderDiningHalls((renderDiningHalls) => {
          return [
            ...renderDiningHalls,
            <TouchableOpacity
              key={value[0]}
              onPress={() => {
                props.navigation.navigate("IndividualHall", {
                  hallName: value[0],
                  friendsInHall: friendsInHall,
                  capacity: capacities[key],
                  activityLevel: getActivityLevelsFromName(value[0]),
                });
              }}
            >
              <DiningHallBar
                title={value[0]}
                activityLevel={getActivityLevelsFromName(value[0])}
                friendsInHall={friendsInHall}
                capacity={capacities[key]}
                style={styles.DHCard}
              />
            </TouchableOpacity>,
          ];
        });
      });
    }
  }, [diningHalls, capacities]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          source={require("../assets/TasteBuds.png")}
        />
        <Text style={styles.headerTxt}>TasteBuds</Text>
        <View style={styles.headerImg} />
      </View>

      {renderDiningHalls}
    </SafeAreaView>
  );
}
