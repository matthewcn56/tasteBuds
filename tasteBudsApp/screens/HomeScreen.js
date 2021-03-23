import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { db } from "../firebase/firebaseFunctions";
import DiningHallBar from "./diningHalls/DiningHallBar.js";

export default function HomeScreen(props) {
  //const axios = require("axios").default; //NIXED DevX API, it's not functioning
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [capacities, setCapacities] = useState();
  const [profilePic, setProfilePic] = useState(null);
  //set userName on mount
  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  //set the capacities on mount
  useEffect(() => {
    db.ref("capacities").on("value", (snapshot) => {
      setCapacities(snapshot.val());
    });
  }, []);

  useEffect(() => {
    console.log("user's uid is " + user.uid);
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        console.log("snapshot exists!");
        console.log(querySnapshot.val());
        setList(querySnapshot.val());
      } else {
        console.log("snapshot doesn't exist?");
        setList(null); //IS THIS CORRECT
      }
    };
    db.ref("friends/" + user.uid).on("value", onValueChange);

    return () => {
      db.ref("friends/" + user.uid).off("value", onValueChange);
    };
  }, []);


  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />


      <TouchableOpacity /*onPress={props.navigation.navigate("DiningHallScreen", {hallName: key})}*/>
        <DiningHallBar 
          title="BPlate"
          waitTime={15}
          friendsInHall={["MVCOEG2sEIUtEMmRw5ZTjFGFNIZ2", "ajVE7NPb8bMUObzJnKnKXxIp3Qw1"]}
          capacity={capacities}
        />
      </TouchableOpacity>


      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
