import React, { useContext } from "react";
import styles from "../styles.js";
import { Text, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => login()} style={styles.signinButton}>
        <Text>Sign In or Register With Google</Text>
      </TouchableOpacity>
    </View>
  );
}
