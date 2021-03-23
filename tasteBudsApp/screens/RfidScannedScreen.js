import React from "react";
import styles from "../styles";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { useContext } from "react/cjs/react.development";

export default function RfidScannedScreen(props) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>This is our RfidScanned Page </Text>
      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
