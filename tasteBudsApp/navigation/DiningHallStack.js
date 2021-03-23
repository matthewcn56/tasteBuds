import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DiningHallBar from "../screens/diningHalls/DiningHallBar.js";
import DiningHallScreen from "../screens/diningHalls/DiningHallScreen";
import HomeScreen from "../screens/HomeScreen";

export default function DiningHallStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="DiningHalls">
      <Stack.Screen
        name="DiningHalls"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="DiningHallScreen"
        component={DiningHallScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
