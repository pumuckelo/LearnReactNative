import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const StyledButton = props => {
  const { onPress, title } = props;

  const style = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 30
    },
    button: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderRadius: 20,
      padding: 10,
      paddingRight: 40,
      paddingLeft: 40,
      elevation: 3,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 10
    },
    text: {
      color: colors.white,
      fontFamily: "AvenirLTStd-Medium",
      fontSize: 20
    }
  });
  return (
    // <View style={style.wrapper}>
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
    // </View>
  );
};

export default StyledButton;
