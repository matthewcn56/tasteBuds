import React, { useState, useEffect } from "react";
import styles from "../../styles";
import {
  SafeAreaView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DiningHallMenu(props) {
  const [menu, setMenu] = useState(null);
  const [renderMenuItems, setRenderMenuItems] = useState([]);
  const {
    hallName
  } = props.route.params;

  const openURL = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  // pulling the menu data from database
  useEffect(() => {
    let onValueChange = function (querySnapshot) {
      if (querySnapshot.exists()) {
        setMenu(querySnapshot.val());
      } else {
        setMenu(null);
      }
    };
    db.ref("menus/" + hallName).on("value", onValueChange);

    return () => {
      db.ref("menus/" + hallName).off("value", onValueChange);
    };
  }, []);

  // render menu items
  useEffect(() => {
    if (menu) {
      setRenderMenuItems(
        Object.entries(menu).map((item, key) => {
          return (
            <View key={item[0]}>
              <Text style={styles.IDHMeal}>{item[0]}</Text>
              {Object.entries(item[1]).map((dish, key) => (
                <TouchableOpacity
                  key={dish[0] + key}
                  onPress={() => openURL(dish[1])}
                >
                  <Text style={styles.IDHMenuItem}>{dish[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })
      );
    } else {
      setRenderMenuItems([]);
    }
  }, [menu]);

  return (
    <SafeAreaView style={styles.containerscroll}>
    <ScrollView contentContainerStyle={styles.scroll} key={`${hallName} Menu`}>
      <View style={styles.IDHContainer}>
        {renderMenuItems}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
