import React from "react";
import styles from "../../styles";
import { View, Text } from "react-native";
export default function DiningHallBar(props) {
  <View>
    <View>
      <Text> {props.title}</Text>
      <Text> {props.waitTime} minutes </Text>
    </View>

    <View>{props.friendsInHall}</View>

    <View>{props.capacity}</View>
  </View>;
}
