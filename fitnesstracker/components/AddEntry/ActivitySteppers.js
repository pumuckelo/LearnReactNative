import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import colors from "../../utils/colors";

const ActivitySteppers = props => {
  const { activity, value, onIncrement, onDecrement } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {value} {activity.unit[0].toUpperCase() + activity.unit.substring(1)}
        </Text>
        <Text></Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          color={colors.primary}
          accessibilityLabel="Plus"
          title="+"
          onPress={onDecrement}
        >
          <AntDesign name="minuscircleo" size={30} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          color={colors.primary}
          accessibilityLabel="Minus"
          title="-"
          onPress={onIncrement}
        >
          <AntDesign name="pluscircleo" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "row",
    // margin: 10,
    justifyContent: "space-around"
    // alignItems: "center"
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "AvenirLTStd-Medium",
    color: "#071e3d"
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    // marginLeft: 60,
    justifyContent: "space-around"
  }
});

export default ActivitySteppers;
