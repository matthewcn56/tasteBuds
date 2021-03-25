import React, { useState, useEffect } from "react";
import styles from "../../styles";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import Entypo from "react-native-vector-icons/Entypo";
import AuthContext from "../../navigation/AuthProvider";

export default function FriendsListBar(props) {
  const [friend, setFriend] = useState(null);
  const [currHall, setCurrHall] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
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
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setFriend(querySnapshot.val());
      } else {
        setFriend(null);
      }
    };
    db.ref("users/" + props.uid).on("value", onValueChange);
  }, []);

  useEffect(() => {
    console.log(friend);
    if (friend) {
      setCurrHall(friend["currHall"]);
      setUserImage(friend["profilePic"]);
    } else {
      setCurrHall("");
      setUserImage("");
    }
    setLoading(false);
  }, [friend]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.FBCard}>
      <Image
        style={styles.FBCardPic}
        source={userImage ? { uri: userImage } : null}
      />
      <View style={styles.FBCardMidCol}>
        <Text style={styles.FBCardName}>{props.name}</Text>
        <Text style={styles.FBCardHall}>
          {currHall ? "currently in " + currHall : ""}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.FBCardX}
        onPress={createConfirmDeletionAlert}
      >
        <Entypo name="cross" size={40} />
      </TouchableOpacity>
    </View>
  );
}
