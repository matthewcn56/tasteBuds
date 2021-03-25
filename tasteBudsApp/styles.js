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
    height: "100%",
  },
  regText: {
    fontFamily: textFont,
    fontSize: windowWidth/24,
    color: dark,
  },
  timeText: {
    fontFamily: textFont,
    fontSize: windowWidth/24,
    color: dark,
    marginTop: windowWidth/120,
  },
  timeTextIcon: {
    marginTop: windowWidth/120,
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
    marginTop: -windowWidth/200,
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
    marginTop: windowWidth / 8,
    marginBottom: -windowWidth/30,
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
    marginLeft: windowWidth/12,
    paddingLeft: windowWidth/75,
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
    fontSize: windowWidth/28,
    color: dark,
    marginLeft: windowWidth/14,
    flex:1,
  },
  //end of upper profile container
  profileName: {
    color: dark,
    fontFamily: headerFont,
    textAlign: "center",
    fontSize: windowWidth/20,
    marginBottom: windowWidth /12,
    marginTop: windowWidth/20
  },
  QRCode: {
    margin: windowWidth / 5,
    flex: 1,
    width: (3 * windowWidth) / 5,
  },
  //Friends List on User Profile
  FBnum:{
    marginTop: windowWidth/8,
    fontFamily: textFont,
    fontSize: windowWidth/24,
    width: windowWidth - windowWidth/6,
    textAlign: "left",
    color: dark,
    paddingBottom: windowWidth/40,
  },
  FBContainer: {
    flexDirection: "column",
  },
  FBCard:{
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth - windowWidth/6,
    paddingBottom: windowWidth/40,
    
  },
  FBCardPic:{
    height: windowWidth/10,
    width: windowWidth/10,
    borderRadius: windowWidth/10,
    marginRight: windowWidth/20,
  },
  FBCardMidCol:{
    flex: 1,
    flexDirection: "column",
  },
  FBCardName:{
    fontFamily: headerFont,
    fontSize: windowWidth/20,
    color: dark,
    marginBottom: -windowWidth/40,
  },
  FBCardHall:{
    fontFamily: textFont,
    fontSize: windowWidth/24,
    color: dark,
    marginTop: windowWidth/55
  },
  FBCardX:{

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
    position: "relative",
    height: ((7 / 8.4) * windowWidth) / 10,
    width: windowWidth / 10,
  },
  //Dining hall home page
  DHCard: {
    width: windowWidth - windowWidth/15,
    marginBottom: windowWidth/25,
    padding: windowWidth/60,
    paddingBottom: 0,
    backgroundColor: light,
    borderColor: dark,
    borderWidth: 2,
    borderRadius: windowWidth/30,
    flexDirection: "column",
    paddingLeft: windowWidth/30,
    paddingRight: windowWidth/30,
  },
  DHCardRow1: {
    flexDirection: "row",
  },
  DHCardHeader:{
    flex: 1,
    fontSize: windowWidth/20,
    fontFamily: headerFont,
    color: dark,
    marginBottom: -windowWidth/20,
  },
  DHCardRow2:{
    
  },
  DHCardRow3:{
    flexDirection:"row",
    marginBottom: -windowWidth/60,
    marginTop: windowWidth/70,
  },
  DHCardPic:{
    marginRight: windowWidth/60,
    height: windowWidth/12,
    width: windowWidth/12,
    borderRadius: windowWidth/12,
    borderColor: mid,
    borderWidth: 1,
  },
  DHCardSlider:{
    color: dark,
    backgroundColor: mid,
  },
});
