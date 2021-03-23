import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


//global styling variables
const dark = "#151057";
const mid =  "edb7e3";
const light = "f9e4f8";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signinButton: {
    fontFamily: "FredokaOne_400Regular",
    alignItems: "center",
    backgroundColor: "#b3d0ff",
    padding: 20,
    borderRadius: 20,
  },

  profileImage: {
    height: 250,
    width: 250,
  },
  friendImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  logo: {
    height: 300,
    width: 400,
  },
  appName: {
    fontSize: 40,
    fontFamily: 'FredokaOne_400Regular',
  },
});
