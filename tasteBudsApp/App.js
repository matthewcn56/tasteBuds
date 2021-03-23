import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator} from "react-native";
import styles from "./styles.js";
import NavigationStack from "./navigation/NavigationStack";
import Providers from "./navigation/index";
import {  useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { 
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function App() {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large"/>
  } else {
    return <Providers />;
  }
}
