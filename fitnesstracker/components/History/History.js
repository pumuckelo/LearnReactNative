import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { recieveEntries, addEntry } from "../../actions";
import { timeToString, getDailyReminder } from "../../utils/helpers";
import Api from "../../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";

class History extends Component {
  state = {};

  componentDidMount() {
    Api.clearEntries();
    Api.getAllCalendarEntries()
      .then(results => {
        return this.props.dispatch(recieveEntries(results));
      })
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          this.props.dispatch(
            addEntry({
              [timeToString()]: getDailyReminder()
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

  renderEmptyDate = formattedDate => {
    return (
      <View>
        <Text>No data submitted</Text>
      </View>
    );
  };
  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History);
