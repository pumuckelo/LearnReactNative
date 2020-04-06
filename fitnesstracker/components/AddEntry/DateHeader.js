import React from "react";
import { View, Text } from "react-native";
import colors from "../../utils/colors";

const DateHeader = props => {
  const { date } = props;

  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 20,
        color: colors.heading,
        alignSelf: "flex-start",
        marginBottom: 10
      }}
    >
      {date}
    </Text>
  );
};

export default DateHeader;
