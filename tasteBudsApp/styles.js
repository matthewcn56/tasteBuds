import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
const dark = "#151057";
const mid = "#edb7e3";
const light = "#f9e4f8";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const titleFont = "FredokaOne_400Regular";
const headerFont = "Poppins_600SemiBold";
const textFont = "Poppins_400Regular";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
  },
  regText: {
    fontFamily: textFont,
    fontSize: 15,
  },
  emptyWrapper: {
    flex: 1,
  },
  //Log in page CSS
  logo: {
    height: (5 * windowWidth) / 8.4,
    width: (5 * windowWidth) / 7,

    marginBottom: 100,
  },
  appName: {
    fontSize: 40,
    fontFamily: titleFont,
    color: dark,
    marginBottom: 20,
    marginTop: windowHeight / 5,
  },

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
    backgroundColor: mid,
  },

  //Header Bar
  header: {
    height: windowWidth / 8,
    flexDirection: "row",
    marginTop: windowWidth / 20,
  },
  headerImg: {
    marginLeft: windowWidth / 20,
    height: ((7 / 8.4) * windowWidth) / 8,
    width: windowWidth / 8,
  },
  headerTxt: {
    textAlign: "center",
    fontFamily: titleFont,
    color: dark,
    fontSize: windowWidth / 14,
    flex: 1,
  },
  //User Profile
  profileContainerUpper: {
    marginTop: windowWidth / 3,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: windowWidth / 3,
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  profileImage: {
    height: windowWidth / 3,
    width: windowWidth / 3,
    borderRadius: windowWidth / 3,
  },
  logOutContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButton: {
    height: windowWidth / 7,
    width: windowWidth / 7,
    borderRadius: windowWidth / 6,
    borderColor: dark,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mid,
  },
  //end of upper profile container
  profileName: {
    color: dark,
    fontFamily: headerFont,
    textAlign: "center",
    fontSize: 20,
    marginTop: windowWidth / 20,
    marginBottom: windowWidth / 5,
  },
  QRCode: {
    flex: 1,
    width: (3 * windowWidth) / 5,
  },
  friendImage: {
    height: 250,
    width: 250,
    borderRadius: 250,
  },
  friendBarImage: {
    height: windowWidth / 5,
    width: windowWidth / 5,
    borderRadius: windowWidth / 10,
  },

  //Scannerstuff
  scanner: {
    height: windowHeight,
    width: windowWidth,
  },
  scannerHeader: {
    position: "absolute",
    height: windowWidth / 10,
    flexDirection: "row",
    marginTop: windowWidth / 20,
  },
  scannerLogo: {
    height: ((7 / 8.4) * windowWidth) / 10,
    width: windowWidth / 10,
  },
});
