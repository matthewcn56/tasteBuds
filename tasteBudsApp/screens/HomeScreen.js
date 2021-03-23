import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { db } from "../firebase/firebaseFunctions";
import DiningHallBar from "./diningHalls/DiningHallBar.js";
import { render } from "react-dom";

export default function HomeScreen(props) {
  //const axios = require("axios").default; //NIXED DevX API, it's not functioning
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [friendList, setFriendList] = useState(null);
  const [diningHalls, setDiningHalls] = useState(null);
  const [capacities, setCapacities] = useState([]);
  const [renderDiningHalls, setRenderDiningHalls] = useState([]);

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

    return () => {
      db.ref("friends/" + user.uid).off("value", onValueChange);
    };
  }, []);

  // update dining halls
  useEffect(() => {
    let onCapacityChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setDiningHalls(querySnapshot.val());
      } else {
        setDiningHalls(null); 
      }
    };
    db.ref("capacities/").on("value", onCapacityChange);

    return () => {
      db.ref("capacities/").off("value", onCapacityChange);
    };
  }, []);

  // update capacities
  useEffect(() => {
    if (diningHalls) {
      Object.entries(diningHalls).map((value, key) => {
        let currentNum = Object.keys(value[1]).length - 1;
        setCapacities((capacities) => {
          return [...capacities, currentNum];
        })
      });
    } else {
      setCapacities([]);
    }
  }, [diningHalls])

  // render dining hall components
  useEffect(() => {
    setRenderDiningHalls([]);
    if (diningHalls) {
      Object.entries(diningHalls).map((value, key) => {
        // create friendsInHall array
        let friendsInHall = []
        // map through all the people in value (except dummyNode)
        Object.keys(value[1]).map((person) => {
          // see if that person is a friend
          if (person !== "dummyNode" && Object.keys(friendList).includes(person)) { 
            // add to friendsInHall array
            friendsInHall.push(person);
          }
        })
        console.log(value[0]);
        console.log(friendsInHall);
        // update diningHalls
        setRenderDiningHalls((renderDiningHalls) => {
          return [
            ...renderDiningHalls,
            <TouchableOpacity key={value[0]}>
              <DiningHallBar
                title={value[0]}
                waitTime={15}
                friendsInHall={friendsInHall}
                capacity={capacities[key]}
              />
            </TouchableOpacity>
          ];
        });
      })
    }          
  }, [diningHalls, capacities]);
  

  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />


      
      {renderDiningHalls}

      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
