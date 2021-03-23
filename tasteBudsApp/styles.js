import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


//global styling variables
const dark = "#151057";
const mid =  "#edb7e3";
const light = "#f9e4f8";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const titleFont = "FredokaOne_400Regular";
const headerFont = "Poppins_600SemiBold";
const textFont = "Poppins_400Regular";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 5*windowWidth/8.4,
    width: 5*windowWidth/7,
    
    marginBottom: 100,
  },
  appName: {
    fontSize: 40,
    fontFamily: titleFont,
    color: dark,
    marginBottom: 20,
    marginTop: windowHeight/5,
  },
  //Log in page CSS
  signinButton: {
    fontFamily: textFont,
    alignItems: "center",
    backgroundColor: light,

    padding: 20,

    borderRadius: 20,
    borderStyle: "solid",
    borderColor: dark,
    borderWidth: 4,

  },
  //Navigation bar
  navBar: {
    backgroundColor:mid,
  },
  //everything else
  profileImage: {
    height: 250,
    width: 250,
  },
  friendImage: {
    height: 250,
    width: 250,
    borderRadius: 50,
  },
});
