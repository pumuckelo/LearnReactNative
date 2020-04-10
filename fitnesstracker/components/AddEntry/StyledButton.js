import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import PropTypes from "prop-types";

const StyledButton = (props) => {
  const { onPress, title, color } = props;

  return (
    // <View style={style.wrapper}>
    <TouchableOpacity
      style={[style.button, color && { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
    // </View>
  );
};

StyledButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

export default StyledButton;

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  button: {
    backgroundColor: colors.primary,
    backgroundColor: "#21e6c1",
    //   backgroundColor: colors.newbackground,
    //   color: colors.white,

    borderRadius: 20,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    color: colors.white,
    //   color: colors.newprimary,
    //   color: "#071e3d",
    fontFamily: "AvenirLTStd-Medium",
    fontSize: 20,
  },
});
