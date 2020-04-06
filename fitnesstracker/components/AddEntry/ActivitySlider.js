import React from "react";
import { View, Text, Slider, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const ActivitySlider = props => {
  const { activity, onSlide, value } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          {value} {activity.unit[0].toUpperCase() + activity.unit.substring(1)}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        maximumValue={activity.max}
        value={value}
        onValueChange={onSlide}
        step={activity.step}
        thumbTintColor="#1ce6b3"
        minimumTrackTintColor="#1ce6b3"
        maximumTrackTintColor="#1ce6b3"
      ></Slider>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "AvenirLTStd-Medium",
    flex: 1,
    color: colors.white
  },

  container: {
    flex: 1,
    marginLeft: 25,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  slider: {
    flex: 3
  }
});

export default ActivitySlider;
