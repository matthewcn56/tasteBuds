import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { db } from "../firebase/firebaseFunctions";
import styles from "../styles.js";
import { SafeAreaView, ScrollView, Image, Alert, Switch } from "react-native";
import FriendsListBar from "./userBars/FriendsListBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function UserProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [list, setList] = React.useState(null);
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    db.ref("users/" + user.uid + "/optIn").once("value").then(snapshot => {
      setIsEnabled(snapshot.val());
    })
  }, [])

  const toggleSwitch = () => {
    db.ref("users/" + user.uid + "/optIn").set(!isEnabled);
    setIsEnabled(previousState => !previousState);
  }

  useEffect(() => {
    console.log("user's uid is " + user.uid);
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        console.log("snapshot exists!");
        console.log(querySnapshot.val());
        setList(querySnapshot.val());
        console.log("list changed!");
      } else {
        console.log("snapshot doesn't exist?");
        setList(null); //IS THIS CORRECT
      }
    };
    db.ref("friends/" + user.uid).on("value", onValueChange);

    setLoading(false);

    return () => {
      db.ref("friends/" + user.uid).off("value", onValueChange);
    };
  }, []);

  useEffect(() => {
    //console.log("The uid changed!");
    console.log("The UID is " + user.uid);
  }, [user.uid]);

  //Setting Displayed Items

  useEffect(() => {
    if (list) {
      Promise.all(
        Object.keys(list).map((session) =>
          db.ref("users/" + session + "/displayName").once("value")
        )
      ).then((snapshotVals) => {
        setDisplayedItems(
          snapshotVals.map((snapshot, index) => {
            if (snapshot.exists()) {
              return (
                <FriendsListBar
                  key={Object.keys(list)[index]}
                  name={snapshot.val()}
                  uid={Object.keys(list)[index]}
                  currentUser={user.uid}
                />
              );
            }
          })
        );
        // setDisplayedItems((snapshot) => (
        //   <Text key={snapshot.toString()}> {snapshot.val()} </Text>
        // ));
      });
    } else {
      setDisplayedItems([]);
    }
  }, [list]);

  const createConfirmLogoutAlert = () =>
    Alert.alert("Confirm Logout", "Are You Sure You Want To Log Out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: logout },
    ]);

  return (
    <SafeAreaView style={styles.containerscroll}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileContainerUpper}>
          <View style={styles.logOutContainer} />

          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: user.photoURL }}
            />
          </View>

          <View style={styles.logOutContainer}>
            <View style={styles.logOut} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={createConfirmLogoutAlert}
                style={styles.signOutButton}
              >
                <MaterialCommunityIcons
                  name="logout"
                  color={styles.signinButton.borderColor}
                  size={(2 * styles.signOutButton.width) / 3}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.logOut}>Log Out</Text>
          </View>
        </View>

        <Text style={styles.profileName}>{user.displayName}</Text>

        <QRCode
          size={styles.QRCode.width}
          style={styles.QRCode}
          value={user.uid}
        />
        <View style={styles.locationSwitchContainer}>
          <Text style={styles.locationSwitchText}>Share location with friends: </Text>
          <Switch
            trackColor={{ false: styles.locationSwitch.borderColor, true: styles.locationSwitch.backgroundColor }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={styles.locationSwitch.borderColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style={styles.FBnum}>
          {displayedItems.length}{" "}
          {displayedItems.length == 1 ? "Friend" : "Friends"}
        </Text>
        {displayedItems.length < 1 ? (
          <Text style={styles.FBzeroMsg}>
            Scan A Friend's QR Code To Add Them To Your List!
          </Text>
        ) : null}
        <View style={styles.FBContainer}>{displayedItems}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
