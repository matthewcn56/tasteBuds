import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image } from "react-native";
import { db } from "../firebase/firebaseFunctions";
import DiningHallBar from "./diningHalls/DiningHallBar.js";

export default function HomeScreen() {
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

  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />
      <DiningHallBar 
        title="BPlate"
        waitTime={15}
        friendsInHall={["MVCOEG2sEIUtEMmRw5ZTjFGFNIZ2", "ajVE7NPb8bMUObzJnKnKXxIp3Qw1"]}
        capacity={capacities}
      />
      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
