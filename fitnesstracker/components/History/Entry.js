import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";
import DateHeader from "../AddEntry/DateHeader";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

const Entry = (props) => {
  const { date, entry } = props;
  const { navigation } = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EntryDetail", {
          entry: entry,
          date: date,
        })
      }
      style={styles.container}
    >
      <DateHeader date={date} />
      {!entry ? (
        <Text style={styles.text}>You didn't log any data for this day</Text>
      ) : entry.today ? (
        <Text style={styles.text}>{entry.today}</Text>
      ) : (
        <View>
          <Text style={styles.text}>{JSON.stringify(entry)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: colors.newbackground,
  },
  text: {
    color: colors.white,
  },
});

Entry.propTypes = {
  entry: PropTypes.object,
  date: PropTypes.string,
};
