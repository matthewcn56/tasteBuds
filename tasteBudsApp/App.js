import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "./styles.js";
import NavigationStack from "./navigation/NavigationStack";
import Providers from "./navigation/index";

export default function App() {
  return <Providers />;
}
