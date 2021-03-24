import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Entypo from "react-native-vector-icons/Entypo";
import AuthContext from "../../navigation/AuthProvider";

export default function FriendsListBar(props) {
  const [currHall, setCurrHall] = useState("");
  const [userImage, setUserImage] = useState("");
  //const { user } = useContext(AuthContext);
  //set the value of currHall when the component mounts

  function attemptToRemoveFriend() {
    console.log("Entered function!");
    var updates = {};
    updates["friends/" + props.currentUser + "/" + props.uid] = null;
    updates["friends/" + props.uid + "/" + props.currentUser] = null;
    return db.ref().update(updates);
  }

  const createConfirmDeletionAlert = () =>
    Alert.alert(
      "Confirm Deletion",
      "Are You Sure You Want To Unfriend " + props.name + "?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: attemptToRemoveFriend },
      ]
    );

  useEffect(() => {
    db.ref("users/" + props.uid + "/currHall")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrHall(snapshot.val());
        }
      });

    db.ref("users/" + props.uid + "/profilePic")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserImage(snapshot.val());
        }
      });
  }, [props.uid]);
  return (
    <View>
      <Text>{props.name} </Text>
      <Text> {currHall ? "currently in " + currHall : ""}</Text>
      <Image style={styles.friendBarImage} source={{ uri: userImage }} />
      <TouchableOpacity onPress={createConfirmDeletionAlert}>
        <Entypo name="cross" size={40} />
      </TouchableOpacity>
    </View>
  );
}
