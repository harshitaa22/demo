import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme/index";

export default StyleSheet.create({
  itemSeparatorComponent: {
    backgroundColor: Colors.gray,
    margin: Metrics.rfv(15),
  },
  noDataFoundMainStyle: {
    alignSelf: "center",
  },
  noDataFoundText: {
    color: Colors.black,
    fontSize: Metrics.rfv(18),
    margin: Metrics.rfv(50),
    textAlign: "center",
  },
  checkBoxStyle: {
    height: Metrics.rfv(16),
    width: Metrics.rfv(16),
    borderRadius: Metrics.rfv(4),
  },
  selectionText: {
    color: Colors.black,
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.IN_Regular,
    marginLeft: Metrics.rfv(10),
    lineHeight: Metrics.rfv(15),
  },
  selectionImage: {
    width: Metrics.rfv(30),
    height: Metrics.rfv(30),
    marginLeft: Metrics.rfv(10),
  },
  radioViewStyle: {
    width: Metrics.rfv(16),
    height: Metrics.rfv(16),
    borderRadius: Metrics.rfv(12),
    borderColor: Colors.borderDropDown,
    borderWidth: Metrics.rfv(2),
    backgroundColor: Colors.white,
  },
  radioSelectionStyle: {
    width: Metrics.rfv(10),
    height: Metrics.rfv(10),
    borderRadius: Metrics.rfv(12),
    marginTop: Metrics.rfv(1),
    marginStart: Metrics.rfv(1),
    alignContent: "center",
  },
  rowView: {
    width: Dimensions.get("window").width / 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.rfv(40),
  },
  contentContainerStyle: {
    paddingLeft: Metrics.rfv(20),
    paddingRight: Metrics.rfv(20),
  },
  filterViewStyle: {
    flexDirection: "row",
  },
  scrollContainerStyle: {
    width: "100%",
  },
  secondBannerStyle: {
    width: "100%",
    // marginHorizontal: Metrics.rfv(15),
    height: Metrics.rfv(63),
    resizeMode: "contain",
    marginBottom: Metrics.rfv(20),
  },
});
