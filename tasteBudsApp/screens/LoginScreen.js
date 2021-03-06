import React, { useContext } from "react";
import styles from "../styles.js";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import SvgUri from "react-native-svg-uri";
//import {Logo} from "../assets/TasteBuds.svg";
export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>TasteBuds</Text>
      <Image style={styles.logo} source={require("../assets/TasteBuds.png")} />
      <TouchableOpacity onPress={() => login()} style={styles.signinButton}>
        <Text>Sign In or Register With Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
