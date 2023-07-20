import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme/index";

export default StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(30),
    lineHeight: Metrics.rfv(34),
  },
});
