import React from "react";
import { Text } from "react-native";
export default function TextTitle(props: any) {
  const { title = "" } = props;

  return (
    <Text style={props.textStyle} numberOfLines={1}>
      {title}
    </Text>
  );
}
