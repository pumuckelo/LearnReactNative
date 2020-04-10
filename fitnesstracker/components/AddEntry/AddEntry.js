import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminder,
} from "../../utils/helpers";
import ActivitySteppers from "./ActivitySteppers";
import ActivitySlider from "./ActivitySlider";
import DateHeader from "./DateHeader";
import StyledButton from "./StyledButton";
import { Entypo } from "@expo/vector-icons";
import Api from "../../utils/api";
import { connect } from "react-redux";
import colors from "../../utils/colors";
//import Action creators
import { addEntry } from "../../actions";
import { white } from "../../utils/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import _ from "lodash";

let customFonts = {
  "AvenirLTStd-Medium": require("../../assets/fonts/AvenirLTStd-Medium.otf"),
  "AvenirLTStd-Book": require("../../assets/fonts/AvenirLTStd-Book.otf"),
  "AvenirLTStd-Roman": require("../../assets/fonts/AvenirLTStd-Roman.otf"),
  "Lobster-Regular": require("../../assets/fonts/Lobster-Regular.ttf"),
  "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
  "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
  "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
};

class AddEntry extends Component {
  state = {
    entry: {
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    },
    fontsLoaded: false,
    date: undefined,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();

    let date = _.get(this.props, "route.params.date");
    this.setState({ date: date });
  }
  submit = () => {
    //timetrostring returns a timestamp that will be used as a key in the database
    const date = this.state.date || timeToString();
    const entry = this.state.entry;
    // ????????
    Api.submitEntry(date, entry);

    //redux
    this.props.dispatch(
      addEntry({
        [date]: entry,
      })
    );

    //if accessing addentry screen through entrydetail and not "AddForToday", then after submitting,
    //redicrect user back to the detail page
    if (this.state.date) {
      this.props.navigation.navigate("EntryDetail", {
        date: this.state.date,
        entry,
      });
    }

    //reset the state
    this.setState({
      entry: { run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 },
      date: undefined,
    });
  };

  reset = () => {
    const date = timeToString();

    //update redux
    this.props.dispatch(
      addEntry({
        [date]: getDailyReminder(),
      })
    );
    //route to home

    //update db
    Api.removeEntry(date);
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((prevState) => {
      let count = prevState.entry[metric] + step;

      return {
        ...prevState,
        entry: { ...prevState.entry, [metric]: count < max ? count : max },
      };
    });
  };

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);

    this.setState((prevState) => {
      let count = prevState[metric] - step;
      return {
        ...prevState,
        entry: { ...prevState.entry, [metric]: count > 0 ? count : 0 },
      };
    });
  };

  slide = (metric, value) => {
    this.setState((prevState) => {
      return {
        entry: { ...prevState.entry, [metric]: value },
      };
    });
  };

  render() {
    const metricInfo = getMetricMetaInfo();

    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }

    if (this.props.alreadySubmitted && !this.state.date) {
      return (
        <ScrollView style={styles.wrapper}>
          <View style={styles.secondWrapper}>
            <View style={[styles.container, { alignItems: "center" }]}>
              <Entypo
                name="emoji-happy"
                size={150}
                style={{ color: colors.newsecondary }}
              />
              <Text
                style={{
                  color: colors.newfont,
                  fontSize: 20,
                  textAlign: "center",
                  margin: 10,
                }}
              >
                You already submitted for today.
              </Text>
              <StyledButton onPress={this.reset} title="Reset" />
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.secondWrapper}>
          <Text style={styles.heading}>
            Submit for {this.state.date ? this.state.date : "today"}
          </Text>
          <View style={styles.container}>
            <DateHeader
              date={
                this.state.date
                  ? this.state.date
                  : new Date().toLocaleDateString()
              }
            />
            {Object.keys(metricInfo).map((key) => {
              let value = this.state.entry[key];
              const activity = metricInfo[key];
              return (
                <View style={styles.activity} key={key}>
                  {metricInfo[key].getIcon()}
                  {metricInfo[key].type == "steppers" ? (
                    <ActivitySteppers
                      activity={activity}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      value={value}
                    />
                  ) : (
                    <ActivitySlider
                      activity={activity}
                      onSlide={(value) => this.slide(key, value)}
                      value={value}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <StyledButton title="Submit" onPress={this.submit} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    paddingBottom: 400,
    fontFamily: "AvenirLTStd-Medium",
    // flex: 1
    // marginBottom: 25
  },
  secondWrapper: {
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
    borderRadius: Platform.OS == "ios" ? 30 : 20,

    marginTop: 5,
    // marginBottom: 35,
    backgroundColor: "#071e3d",
    // borderWidth: 2,
    // borderColor: "black",
    // shadowColor: "#000",
    // // shadowOffset: {
    // //   width: 0,
    // //   height: 2
    // // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    fontFamily: "AvenirLTStd-Medium",
    elevation: 10,
  },
  heading: {
    color: colors.heading,
    color: "#415885",
    fontSize: 25,
    // fontWeight: "bold",
    alignSelf: "flex-start",
    margin: 10,

    fontFamily: "AvenirLTStd-Medium",
    fontWeight: "bold",
  },
  activity: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  const date = timeToString();

  return {
    alreadySubmitted: state[date] && typeof state[date].today === "undefined",
  };
};

export default connect(mapStateToProps)(AddEntry);
