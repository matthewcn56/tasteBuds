import React from "react";
import styles from "../styles";
import { View, Text } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";

export default function RfidScannedScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our RfidScanned Page </Text>
    </View>
  );
}
