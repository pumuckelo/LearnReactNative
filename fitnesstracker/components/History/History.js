import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { recieveEntries, addEntry } from "../../actions";
import { timeToString, getDailyReminder } from "../../utils/helpers";
import Api from "../../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { ScrollView } from "react-native-gesture-handler";
import Entry from "./Entry";
import { createStackNavigator } from "@react-navigation/stack";

class History extends Component {
  state = {};

  componentDidMount() {
    Api.getAllCalendarEntries()
      .then((results) => {
        return this.props.dispatch(recieveEntries(results));
      })
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          this.props.dispatch(
            addEntry({
              [timeToString()]: getDailyReminder(),
            })
          );
        }
      });
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    return (
      <View>
        {today ? (
          <Text>{JSON.stringify(today)}</Text>
        ) : (
          <Text>{JSON.stringify(metrics)}</Text>
        )}
      </View>
    );
  };

  renderEmptyDate = (formattedDate) => {
    return (
      <View>
        <Text>No data submitted</Text>
      </View>
    );
  };

  render() {
    const { entries } = this.props;

    return (
      // <UdaciFitnessCalendar
      //   items={entries}
      //   renderItem={this.renderItem}
      //   renderEmptyDate={this.renderEmptyDate}
      // />
      <ScrollView
        ref={(ref) => {
          this.ScrollView = ref;
        }}
        // onContentSizeChange={(contentWidth, contentHeight) =>
        //   (this._contentHeight = contentHeight)
        // }
        onContentSizeChange={() =>
          this.ScrollView.scrollToEnd({ animated: true, duration: 500 })
        }
        style={styles.container}
      >
        {Object.keys(entries).map((key) => (
          <Entry key={key} date={key} entry={entries[key]} {...this.props} />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(entries) {
  return {
    entries,
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default connect(mapStateToProps)(History);
