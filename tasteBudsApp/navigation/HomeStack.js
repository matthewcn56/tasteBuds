import React, { useContext, useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddFriendScreen from "../screens/AddFriendScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import DiningHallStack from "./DiningHallStack.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./AuthProvider";
import { db } from "../firebase/firebaseFunctions";
import RfidScannedScreen from "../screens/RfidScannedScreen";
import styles from "../styles.js";

export default function HomeStack() {
  const { user } = useContext(AuthContext);
  const [rfidScanned, setRfidScanned] = useState(false);

  // //handle user changes
  useEffect(() => {
    let onRfidChanged = function (snapshot) {
      if (snapshot.val()) setRfidScanned(true);
      else setRfidScanned(false);
    };

    db.ref("rfidTags" + "/" + user.uid).on("value", onRfidChanged);

    //return db.ref("rfidTags" + "/" + user.uid).off("value", onRfidChanged);
  }, []);

  useEffect(() => {
    console.log("rfidScanned changed!");
  }, [rfidScanned]);
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={rfidScanned ? "Dining Halls" : "Account Pairing"}
      barStyle={styles.navBar}
      activeColor="#ffffff"
      inactiveColor={styles.signinButton.borderColor}
    >
      <Tab.Screen
        name="Add Friend"
        component={AddFriendScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={24}
            />
          ),
        }}
      />
      {rfidScanned ? (
        <Tab.Screen
          name="Dining Halls"
          component={DiningHallStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="local-dining" color={color} size={24} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Account Pairing"
          component={RfidScannedScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="scan-helper"
                color={color}
                size={24}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
