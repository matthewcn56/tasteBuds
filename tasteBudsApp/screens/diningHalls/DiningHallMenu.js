import React, { useState, useEffect } from "react";
import styles from "../../styles";
import { SafeAreaView, View, Text, Linking, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebaseFunctions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DiningHallMenu(props) {

    const [menu, setMenu] = useState(null);
    const [renderMenuItems, setRenderMenuItems] = useState([]);

    const openURL = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log("Don't know how to open URI: " + link);
            }
        });
    }

    // pulling the menu data from database
    useEffect(() => {
        let onValueChange = function (querySnapshot) {
            if (querySnapshot.exists()) {
                setMenu(querySnapshot.val());
            } else {
                setMenu(null);
            }
        };
        db.ref("menus/" + props.hallName).on("value", onValueChange);
        return () => {
            db.ref("menus/" + props.hallName).off("value", onValueChange);
        };
    }, []);

    // render menu items
    useEffect(() => {
        if (menu) {
            setRenderMenuItems(
                Object.entries(menu).map((item, key) => (
                    <TouchableOpacity onPress={() => openURL(item[1])}>
                        <Text>{item[0]}</Text>
                    </TouchableOpacity>
                ))
            );
        }
    }, [menu]);

    return (
        <View>
            <Text>Menu</Text>
            {renderMenuItems}
        </View>
    );
}