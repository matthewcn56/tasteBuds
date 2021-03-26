import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

//global styling variables
var scrollheight;

if (Platform.OS === "ios") {
  scrollheight = "100%";
} else {
  scrollheight = null;
}

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
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    height: windowHeight,
  },
  containerscroll: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
  },
  scroll: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    width: windowWidth,
  },
  regText: {
    fontFamily: textFont,
    fontSize: windowWidth / 24,
    color: dark,
  },
  timeText: {
    fontFamily: textFont,
    fontSize: windowWidth / 24,
    color: dark,
    marginTop: windowWidth / 120,
  },
  timeTextIcon: {
    marginTop: windowWidth / 120,
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
    borderTopWidth: 2,
    borderColor: dark,
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
    marginTop: -windowWidth / 200,
  },
  headerTxt: {
    textAlign: "center",
    fontFamily: titleFont,
    color: dark,
    fontSize: windowWidth / 14,
    flex: 1,
  },
  headerTxtBubble: {
    aspectRatio: 303 / 44,
    width: windowWidth/1.5,
    marginLeft: windowWidth/18,
  },
  headerTxtBubbleRFID: {
    aspectRatio: 295 / 57,
    width: windowWidth/1.5,
    marginLeft: windowWidth/18,
  },
  //User Profile
  profileContainerUpper: {
    marginTop: windowWidth / 8,
    marginBottom: -windowWidth / 30,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: windowWidth / 3,
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 2,
  },
  profileImage: {
    height: windowWidth / 4,
    width: windowWidth / 4,
    borderRadius: windowWidth / 4,
  },
  logOutContainer: {
    flex: 3,
    justifyContent: "center",
  },
  signOutButton: {
    marginLeft: windowWidth / 12,
    paddingLeft: windowWidth / 75,
    height: windowWidth / 9,
    width: windowWidth / 9,
    borderRadius: windowWidth / 9,
    borderColor: dark,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: light,
    borderColor: dark,
    borderWidth: 2,
  },
  logOut: {
    fontFamily: textFont,
    fontSize: windowWidth / 28,
    color: dark,
    marginLeft: windowWidth / 14,
    flex: 1,
  },
  //end of upper profile container
  profileName: {
    color: dark,
    fontFamily: headerFont,
    textAlign: "center",
    fontSize: windowWidth / 20,
    marginBottom: windowWidth / 12,
    marginTop: windowWidth / 20,
  },
  QRCode: {
    margin: windowWidth / 5,
    flex: 1,
    width: (3 * windowWidth) / 5,
  },
  //Friends List on User Profile
  FBnum: {
    marginTop: windowWidth / 8,
    fontFamily: headerFont,
    fontSize: windowWidth / 20,
    width: windowWidth - windowWidth / 6,
    textAlign: "left",
    color: dark,
    paddingBottom: windowWidth / 40,
  },
  FBzeroMsg: {
    fontFamily: headerFont,
    fontSize: windowWidth / 20,
    width: windowWidth - windowWidth / 6,
    textAlign: "center",
  },
  FBContainer: {
    flexDirection: "column",
  },
  FBCard: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth - windowWidth / 6,
    paddingBottom: windowWidth / 40,
  },
  FBCardPic: {
    height: windowWidth / 10,
    width: windowWidth / 10,
    borderRadius: windowWidth / 10,
    marginRight: windowWidth / 20,
  },
  FBCardMidCol: {
    flex: 1,
    flexDirection: "column",
  },
  FBCardName: {
    fontFamily: textFont,
    fontSize: windowWidth / 20,
    color: dark,
    marginBottom: -windowWidth / 40,
  },
  FBCardHall: {
    fontFamily: textFont,
    fontSize: windowWidth / 24,
    color: "gray",
    marginTop: windowWidth / 55,
  },
  FBCardX: {},

  //Scannerstuff
  scanner: {
    height: windowHeight,
    width: windowWidth,
  },
  scannerHeader: {
    position: "absolute",
    height: windowWidth,
    flexDirection: "row",
    marginTop: windowWidth/9,
  },
  scannerLogo: {
    position: "relative",
    height: ((7 / 8.4) * windowWidth) / 10,
    width: windowWidth / 10,
  },
  scanAgainMsgContainer: {
    position: "absolute",
    height: windowWidth,
    width: windowWidth,
  },
  scanAgainMsg: {
    fontFamily: textFont,
    color: dark,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    padding: windowWidth/50,
    borderRadius: windowWidth/30,
    borderColor: dark,
    borderWidth: 2,
    overflow: "hidden",
    marginTop: windowWidth / 1.2,
  },
  scannerSliderContainer: {
    marginTop: windowWidth/2,
    borderColor: dark,
    borderWidth: 2,
    borderRadius: windowWidth/25,
    height: windowWidth/1.96
  },
  scannerSlider: {
    color: mid,
    backgroundColor: "#FFFFFF",
    width: windowWidth/20,
    height: windowWidth/2,
    borderRadius: windowWidth/50,
    borderColor: dark,
  },
  permissionDeniedContainter: {
    justifyContent: "center",
    alignSelf: "center",
    width: windowWidth - windowWidth/6,
    height: windowHeight - windowHeight/10,
  },
  permissionDeniedMsg: {
    fontFamily: textFont,
    fontSize: windowWidth / 24,
    textAlign: "center",
  },
  //Dining hall home page
  DHCard: {
    width: windowWidth - windowWidth / 15,
    marginBottom: windowWidth / 25,
    padding: windowWidth / 60,
    paddingBottom: 0,
    backgroundColor: light,
    borderColor: dark,
    borderWidth: 2,
    borderRadius: windowWidth / 30,
    flexDirection: "column",
    paddingLeft: windowWidth / 30,
    paddingRight: windowWidth / 30,
  },
  DHCardRow1: {
    flexDirection: "row",
  },
  DHCardHeader: {
    flex: 1,
    fontSize: windowWidth / 20,
    fontFamily: headerFont,
    color: dark,
    marginBottom: -windowWidth / 20,
  },
  DHCardRow2: {},
  DHCardRow3: {
    flexDirection: "row",
    marginBottom: -windowWidth / 60,
    marginTop: windowWidth / 70,
  },
  DHCardPic: {
    marginRight: windowWidth / 60,
    height: windowWidth / 12,
    width: windowWidth / 12,
    borderRadius: windowWidth / 12,
    borderColor: mid,
    borderWidth: 1,
  },
  DHCardSlider: {
    color: dark,
    backgroundColor: mid,
  },
  DHCardPfpOverflow: {
    marginTop: windowWidth/50,
    fontSize: windowWidth/28,
  },
  //Individual Dining Hall Screen
  IDHContainer: {
    flexDirection: "column",
    height: scrollheight,
    width: windowWidth-windowWidth/6,
  },
  IDHNumOfFriends:{
    color: dark,
    fontSize: windowWidth/20,
    fontFamily: headerFont,
    marginTop: windowWidth/20,
  },
  IDHHeader: {
  
  },
  IDHTimeRow: {
    marginTop: windowWidth/12,
    marginBottom: windowWidth/24,
    flexDirection: "row",
  },
  IDHSlider: {
    marginTop: -windowWidth/30,
  },
  IDHFriendList: {
    flexDirection: "row",
    marginTop: windowWidth/20,
  },
  IDHPic: {
    height: windowWidth/10,
    width: windowWidth/10,
    borderRadius: windowWidth/10,
    marginRight: windowWidth/20,
    marginBottom: windowWidth/20,
  },
  IDHfriends: {
    height: windowWidth/10,
    marginBottom: windowWidth/20,
    paddingTop: windowWidth/80,
    fontFamily: textFont,
    fontSize: windowWidth/20,
    color: dark,
  },
  IDHMenuButton: {
    fontFamily: headerFont,
    fontSize: windowWidth/22,
    backgroundColor: light,
    alignSelf: "flex-start",
    padding: windowWidth/50,
    borderRadius: windowWidth/50,
    borderWidth: 2,
    borderColor: dark,
    overflow: "hidden",
    marginTop: windowWidth/40,
  },
  IDHMenuHours: {
    fontFamily: textFont,
    fontSize: windowWidth/24,
    marginTop: windowWidth/20,
    marginLeft: windowWidth/50,
  },
  IDHMenu:{
    fontFamily: headerFont,
    fontSize: windowWidth/20,
    color: dark,
  },
  IDHMeal: {
    fontFamily: headerFont,
    fontSize: windowWidth/16,
    color: dark,
    marginTop: windowWidth/16,
    marginBottom: windowWidth/16, 
  },
  IDHMenuItem:{
    fontFamily: textFont,
    fontSize: windowWidth/20,
    color: dark,
  },
  
});
