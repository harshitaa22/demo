/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../../theme/colors";
import { Dimens } from "../../../../theme/dimens";
import { Fonts } from "../../../../theme/fonts";
import { claculateStausBarHeight } from "../../../../utils/commonFunction";

const styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.White,
  },
  contentStyle: {
    flex: 1,
    marginHorizontal: Dimens.dimen_15,
  },
  scrollViewReadMoreStyle: {
    flexGrow: 1,
    paddingBottom: Dimens.dimen_75,
  },
  searchHeaderStyle: {
    marginVertical: Dimens.dimen_10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  serchContainerStyle: {
    flex: 1,
    height: Dimens.dimen_35,
    borderColor: Colors.ThemeColor,
    borderWidth: Dimens.dimen_1_half,
    borderRadius: Dimens.dimen_7,
    paddingHorizontal: Dimens.dimen_7,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchIconStyle: {
    width: Dimens.dimen_15,
    height: Dimens.dimen_15,
  },
  searchTextinputStyle: {
    flex: 1,
    padding: 0,
    width: "100%",
    color: Colors.Black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_14,
    lineHeight: Dimens.dimen_16,
    paddingHorizontal: Dimens.dimen_10,
  },
  whatsAppIconStyle: {
    width: Dimens.dimen_35,
    height: Dimens.dimen_35,
    marginLeft: Dimens.dimen_10,
    marginRight: Dimens.dimen_10,
  },
  itemContainerStyle: {
    flex: 1,
    width: "99%",
    backgroundColor: Colors.imageSliderBack,
    borderRadius: Dimens.dimen_10,
    paddingTop: Dimens.dimen_15,
    paddingBottom: Dimens.dimen_30,
    flexDirection: "row",
    paddingHorizontal: Dimens.dimen_15,
  },
  flexView: {
    flex: 1,
  },
  blogIcon: {
    width: Dimens.dimen_35,
    height: Dimens.dimen_35,
    marginLeft: Dimens.dimen_10,
  },
  sliderText: {
    fontSize: Dimens.dimen_14,
    lineHeight: Dimens.dimen_16,
    fontFamily: Fonts.SemiBold,
    color: Colors.White,
  },
  testimonialsImageStyle: {
    height: Dimens.dimen_82,
    width: Dimens.dimen_82,
    resizeMode: "contain",
    marginTop: Dimens.dimen_10,
    borderRadius: Dimens.dimen_82 / 2,
    marginBottom: Dimens.dimen_20,
  },
  activeDotStyle: {
    width: Dimens.dimen_12,
    height: Dimens.dimen_8,
    borderRadius: Dimens.dimen_6,
    backgroundColor: Colors.ThemeColor,
  },
  dotStyle: {
    width: Dimens.dimen_8,
    height: Dimens.dimen_8,
    borderRadius: Dimens.dimen_4,
    backgroundColor: Colors.White,
  },
  imageSliderContainerStyle: {
    width: "100%",
  },
  buttonContainerStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: Dimens.dimen_20,
    marginTop: Dimens.dimen_20,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImageStyle: {
    width: Dimens.dimen_120,
    height: Dimens.dimen_140,
    paddingLeft: Dimens.dimen_5,
  },
  howWorksButtonStyle: {
    borderRadius: Dimens.dimen_20,
    paddingVertical: Dimens.dimen_9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Dimens.dimen_10,
  },

  howWorksButtonTextStyle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_12,
    textAlign: "center",
    lineHeight: Dimens.dimen_14,
  },
  sliderButtonContainerStyle: {
    borderRadius: Dimens.dimen_8,
    paddingVertical: Dimens.dimen_8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Dimens.dimen_10,
    paddingHorizontal: Dimens.dimen_10,
  },

  sliderButtonTextStyle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_12,
    textAlign: "center",
    lineHeight: Dimens.dimen_14,
  },
  myTestButtonStyle: {
    width: "50%",
    paddingVertical: Dimens.dimen_8,
    borderRadius: Dimens.dimen_20,
    borderColor: Colors.ThemeColor,
    borderWidth: Dimens.dimen_1_half,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Dimens.dimen_5,
  },
  sliderButtonStyle: {
    paddingTop: Dimens.dimen_10,
    paddingBottom: Dimens.dimen_10,
  },
  sampleTextStyle: {
    color: Colors.ThemeColor,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_12,
    lineHeight: Dimens.dimen_14,
  },
  aboutUsTextStyle: {
    color: Colors.ThemeColor,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.dimen_20,
    lineHeight: Dimens.dimen_22,
    marginVertical: Dimens.dimen_25,
    alignSelf: "center",
  },
  categoryTextStyle: {
    color: Colors.ThemeColor,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.dimen_20,
    lineHeight: Dimens.dimen_22,
    marginTop: Dimens.dimen_30,
    alignSelf: "center",
    marginBottom: Dimens.dimen_10,
  },
  buttonInnerContainerStyle: {
    width: "50%",
  },
  videoIconStyle: {
    width: Dimens.dimen_15,
    height: Dimens.dimen_15,
    marginRight: Dimens.dimen_5,
  },
  readMoreTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.dimen_11,
    lineHeight: Dimens.dimen_20,
    color: Colors.blueTextColor,
    textDecorationLine: "underline",
  },
  readLessTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.dimen_11,
    lineHeight: Dimens.dimen_20,
    color: Colors.ThemeColor,
    textDecorationLine: "underline",
    marginLeft: Dimens.dimen_15,
  },
  htmlTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_11,
    lineHeight: Dimens.dimen_20,
    color: Colors.DescriptionColor,
  },
  topicTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_11,
    color: Colors.DescriptionColor,
  },

  categoryContainerStyle: {
    width: "100%",
    borderRadius: Dimens.dimen_10,
    paddingVertical: Dimens.dimen_12,
    paddingHorizontal: Dimens.dimen_12,
    marginTop: Dimens.dimen_10,
  },
  topicView: {
    backgroundColor: Colors.Black,
    height: Dimens.dimen_5,
    width: Dimens.dimen_5,
    borderRadius: 2.5,

    marginRight: Dimens.dimen_5,
    marginTop: Dimens.dimen_5,
  },
  rowContainerView: {
    flexDirection: "row",
    alignItems: "flex-start",

    justifyContent: "center",
    marginTop: Dimens.dimen_5,
  },
  centerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIconStyle: {
    width: Dimens.dimen_35,
    height: Dimens.dimen_35,
    borderRadius: Dimens.dimen_15,
    marginBottom: Dimens.dimen_10,
  },
  categoryTitleTextStyle: {
    color: Colors.DescriptionColor,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.dimen_16,
    lineHeight: Dimens.dimen_18,
    marginTop: Dimens.dimen_10,
  },
  flatlistStyle: {
    flexGrow: 1,
    marginTop: Dimens.dimen_10,
    marginBottom: Dimens.dimen_10,
  },
  nextIconStyle: {
    width: Dimens.dimen_22,
    height: Dimens.dimen_22,
    resizeMode: "contain",
  },
  viewContactUs: {
    justifyContent: "center",
  },

  viewWhatsApp: {
    height: Dimens.dimen_150,
    width: "100%",
    borderRadius: Dimens.dimen_10,
  },
  testinalsContainerstyle: {
    backgroundColor: Colors.cream,
    width: "80%",
    marginTop: Dimens.dimen_10,
    alignSelf: "center",
    borderRadius: Dimens.dimen_5,
    borderBottomWidth: Dimens.dimen_3,
    borderBottomLeftRadius: Dimens.dimen_5,
    borderBottomRightRadius: Dimens.dimen_5,
    borderColor: Colors.ThemeColor,
    height: Dimens.dimen_340,
  },
  testimonialsDrTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: Dimens.dimen_17,
    lineHeight: Dimens.dimen_20,
    marginTop: Dimens.dimen_7,
    color: Colors.Black,
  },
  viewFormList: {
    width: "100%",
    borderRadius: Dimens.dimen_10,
    backgroundColor: Colors.lightPurpule,
    padding: Dimens.dimen_20,
    marginTop: Dimens.dimen_30,
    marginBottom: Dimens.dimen_20,
  },
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: Dimens.dimen_10,
    paddingVertical: Dimens.dimen_20,
  },
  cancelButtonIcon: {
    height: Dimens.dimen_16,
    width: Dimens.dimen_16,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  testMonialsContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    borderRadius: Dimens.dimen_10,
    paddingVertical: Dimens.dimen_8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Dimens.dimen_15,
  },
  loadingViewStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelSearchIcon: {
    height: Dimens.dimen_18,
    width: Dimens.dimen_18,
    resizeMode: "contain",
  },
  flatlistStyle: {
    flexGrow: 1,
    marginTop: Dimens.dimen_10,
    marginBottom: Dimens.dimen_10,
  },
  searchTitle: {
    fontFamily: Fonts.Medium,
    fontSize: Dimens.dimen_16,
    lineHeight: Dimens.dimen_20,
    color: Colors.blueTextColor,
    marginLeft: Dimens.dimen_10,
  },
  indexArrow: {
    height: Dimens.dimen_10,
    width: Dimens.dimen_10,
    backgroundColor: Colors.blueTextColor,
    borderRadius: Dimens.dimen_10 / 2,
  },
  searchContainerView: {
    flexDirection: "row",
    marginTop: Dimens.dimen_20,
    alignItems: "center",
  },
  resultTitle: {
    flex: 1,
    color: Colors.Black,
    fontFamily: Fonts.Medium,
    fontSize: Dimens.dimen_20,
    lineHeight: Dimens.dimen_25,
  },
  notDataTitle: {
    fontFamily: Fonts.Medium,
    fontSize: Dimens.dimen_20,
    lineHeight: Dimens.dimen_25,
    marginHorizontal: Dimens.dimen_15,
    textAlign: "center",
    color: Colors.Black,
    marginTop: Dimens.dimen_10,
  },
  positionView: {
    width: "100%",
    flex: 1,
    backgroundColor: Colors.White,
    height: "95%",
    position: "absolute",
    marginTop: Dimens.dimen_50,
    paddingBottom: Dimens.dimen_30,
  },
  cancelContainerView: {
    paddingHorizontal: Dimens.dimen_20,
    paddingVertical: Dimens.dimen_7,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Dimens.dimen_5,
  },
  userValidEmailText: {
    color: Colors.blueTextColor,
    fontFamily: Fonts.Medium,
    fontSize: Dimens.dimen_14,
    lineHeight: Dimens.dimen_16,
    textAlign: "center",
    marginTop: Dimens.dimen_10,
  },
  container: {
    backgroundColor: Colors.transparantGrayColor,
  },
  modelEndView: {
    backgroundColor: Colors.transparantBlackColor,
    flex: 1,
    justifyContent: "center",
    marginBottom: Platform.OS === "ios" ? Dimens.dimen_75 : Dimens.dimen_60,
    padding: Dimens.dimen_10,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: Colors.White,
    borderRadius: Dimens.dimen_5,
    width: "90%",
  },
  horizontalView: {
    padding: Dimens.dimen_30,
  },
  cancelIcon: {
    height: Dimens.dimen_14,
    width: Dimens.dimen_14,
    resizeMode: "contain",
    marginRight: Dimens.dimen_5,
  },
  searchCancelIcon: {
    height: Dimens.dimen_16,
    width: Dimens.dimen_16,
    resizeMode: "contain",
    marginRight: Dimens.dimen_5,
  },
  cancelContainer: {
    // alignItems: "center",
    position: "absolute",
    // justifyContent: "flex-end",
    right: 0,
    top: 0,
    padding: Dimens.dimen_10,
    marginTop: claculateStausBarHeight(),
  },
  textContainerView: {
    alignItems: "center",
  },
  logoImageStyle: {
    width: Dimens.dimen_140,
    height: Dimens.dimen_80,
    resizeMode: "contain",
  },
  textInputStyle: {
    textAlignVertical: "top",
    flex: 1,
    padding: 0,
    color: Colors.Black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_16,
    lineHeight: Dimens.dimen_18,
    height: Dimens.dimen_80,
    paddingVertical: Dimens.dimen_10,
    paddingHorizontal: Dimens.dimen_10,
  },
  testimonialtextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_11,
    lineHeight: Dimens.dimen_20,
    color: Colors.DescriptionColor,
    textAlign: "center",
    paddingHorizontal: Dimens.dimen_12,
    paddingBottom: Dimens.dimen_30,
  },
  starContainerStyle: {
    marginTop: Dimens.dimen_5,
    marginBottom: Dimens.dimen_15,
  },
  sliderGroupIcon: {
    height: Dimens.dimen_30,
    width: Dimens.dimen_100,
    resizeMode: "contain",
  },
  logoIcon: {
    height: Dimens.dimen_20,
    width: Dimens.dimen_24,
    resizeMode: "contain",
  },
  trustedTitle: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_11,
    lineHeight: Dimens.dimen_14,
    color: Colors.White,
    marginLeft: Dimens.dimen_5,
    flex: 1,
  },
  countriesView: {
    flexDirection: "row",
    marginTop: Dimens.dimen_5,
    alignItems: "center",
    marginBottom: Dimens.dimen_15,
  },
  australianNoText: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.dimen_12,
    lineHeight: Dimens.dimen_14,
    color: Colors.blueTextColor,
    textAlign: "center",
    marginBottom: Dimens.dimen_25,
    marginTop: Dimens.dimen_10,
  },
});
export default styles;
