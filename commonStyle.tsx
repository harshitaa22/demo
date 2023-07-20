import { StyleSheet } from "react-native";
import Colors from "./colors";
import Fonts from "./fonts";
import Metrics from "./metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  commonFlex: {
    flex: 1,
  },
  commonShadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: Metrics.rfv(5),
    elevation: 2,
  },
  commonRow: {
    flexDirection: "row",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  commonCeterView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
  },
  alignCenterView: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  correctIcon: {
    alignSelf: "center",
    marginStart: Metrics.rfv(10),
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  textInputStyle: {
    flex: 1,
    padding: 0,
    color: Colors.white,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(14),
    lineHeight: Metrics.rfv(16),
  },
  inputTextContainerStyle: {
    width: "100%",
    marginTop: Metrics.rfv(15),
  },
  labelTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.IN_SemiBold,
    fontSize: Metrics.rfv(12),
    lineHeight: Metrics.rfv(16),
  },
  labelTextFormStyle: {
    color: Colors.white,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(16),
    lineHeight: Metrics.rfv(20),
  },
  extralLabelTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(12),
    lineHeight: Metrics.rfv(14),
  },
  inputTextStyle: {
    height: Metrics.rfv(44),
    backgroundColor: Colors.lightblue,
    borderColor: Colors.gray,
    borderWidth: Metrics.rfv(0.6),
    borderRadius: Metrics.rfv(7),
    paddingHorizontal: Metrics.rfv(10),
    width: "100%",
    padding: 0,
    color: Colors.white,
    marginTop: Metrics.rfv(5),
  },
  datePickerStyle: {
    height: Metrics.rfv(44),
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    borderWidth: Metrics.rfv(0.6),
    borderRadius: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(10),
    width: "95%",
    padding: 0,
    color: Colors.white,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(14),
    lineHeight: Metrics.rfv(16),
    marginTop: Metrics.rfv(5),
    marginBottom: Metrics.rfv(10),
    alignSelf: "center",
  },
  datePickerTextInputStyle: {
    flex: 1,
    padding: 0,
    color: Colors.gray,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(14),
    lineHeight: Metrics.rfv(16),
  },
  loader: {
    backgroundColor: Colors.transparent,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWidth: {
    borderBottomWidth: Metrics.rfv(0.7),
    borderBottomColor: Colors.lightGray,
    marginTop: Metrics.rfv(8),
    marginBottom: Metrics.rfv(8),
  },
  bottomContainer: {
    paddingBottom: Metrics.rfv(30),
  },
  centerFlex: {
    flex: 1,
    alignItems: "center",
  },
});
export default styles;
