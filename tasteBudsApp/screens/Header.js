import React, { useContext } from "react";
import styles from "../styles.js";
import { Text, View, Image } from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Image style ={styles.headerImg} source={require("../assets/TasteBuds.png")}/>
            <Text style = {styles.headerTxt}>TasteBuds</Text>
        </View>
    );
  }