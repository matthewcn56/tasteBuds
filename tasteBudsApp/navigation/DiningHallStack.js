import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DiningHallBar from "../screens/diningHalls/DiningHallBar.js";
import DiningHallScreen from "../screens/diningHalls/DiningHallScreen";
import DiningHallMenu from "../screens/diningHalls/DiningHallMenu";
import HomeScreen from "../screens/HomeScreen";

export default function DiningHallStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Dining Halls">
      <Stack.Screen
        name="Dining Halls"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="IndividualHall"
        component={DiningHallScreen}
        //options={{ header: props.route.params }}
        //options={{ header: hallName }}
        options={({ route }) => ({ title: route.params.hallName })}
      />
      <Stack.Screen
        name="Menu"
        component={DiningHallMenu}
        options={({ route }) => ({ title: `${route.params.hallName} Menu`})}
      />
    </Stack.Navigator>
  );
}
