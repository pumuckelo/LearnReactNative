import React from "react";
import Entry from "./Entry";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../utils/colors";
import DateHeader from "../AddEntry/DateHeader";
import { getMetricMetaInfo } from "../../utils/helpers";
import StyledButton from "../AddEntry/StyledButton";
import { removeEntry, resetEntry } from "../../actions";
import { connect } from "react-redux";
import api from "../../utils/api";
import { StackActions } from "@react-navigation/native";

const EntryDetail = (props) => {
  const { entry, date } = props.route.params;

  const { navigation } = props;

  const onDelete = () => {
    //remove from state
    props.resetEntry();

    //remove from database
    api.removeEntry(date).catch((err) => console.log(err));

    //go back in stack
    navigation.dispatch(StackActions.pop(1));
  };

  const onEdit = () => {
    navigation.navigate("EditEntry", { date });
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <DateHeader date={date} />
        {entry && entry.run !== undefined ? (
          <View>
            {Object.entries(entry).map((array) => {
              return (
                <View key={array[0]} style={styles.activity}>
                  {getMetricMetaInfo(array[0]).getIcon()}
                  <Text style={styles.text}>{array[1]}</Text>
                </View>
              );
            })}
            <View style={styles.buttons}>
              <StyledButton title="Edit" onPress={onEdit} />
              <StyledButton color="red" title="Delete" onPress={onDelete} />
            </View>
          </View>
        ) : (
          <StyledButton title="Add" onPress={onEdit} />
        )}
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeEntry: () => dispatch(removeEntry(ownProps.route.params.date)),
    resetEntry: () => dispatch(resetEntry(ownProps.route.params.date)),
  };
};

export default connect(null, mapDispatchToProps)(EntryDetail);

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
  container: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.newbackground,
    padding: 10,
    minHeight: 100,
  },
  text: {
    color: colors.newfont,
    fontFamily: "AvenirLTStd-Medium",
    fontSize: 30,
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    margin: 2.5,
  },
  buttons: {
    flexDirection: "row",
  },
});
