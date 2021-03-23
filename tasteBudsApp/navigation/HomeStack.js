import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import DiningHallStack from "./DiningHallStack.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function HomeStack() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="AddFriend"
        component={AddFriendScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Dining Halls"
        component={DiningHallStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-dining" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="UserProfile"
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
