import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../navigation/AuthProvider";
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { db } from '../firebase/firebaseFunctions.js';



export default function AddFriendScreen() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {user, setUser, logout, } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data === "" || data.includes(".", "#", "$", "[", "]"))
      alert("Invalid QR Code");
    else {
      db.ref('users/' + data + '/displayName').once('value').then((snapshot) => {
        if (snapshot.exists()) {
          alert(`${snapshot.val()} has been added to your friends list!`);
          // add to database
        } else {
          alert("Invalid QR Code");
        }
      }).catch(function(error) {
        console.error(error);
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={StyleSheet.absoluteFillObject}>This is our QR Reader Screen!</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});