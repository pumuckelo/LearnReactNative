import React from "react";
import { AsyncStorage } from "react-native";
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from "./_calender";

class Api {
  clearEntries() {
    return AsyncStorage.clear();
  }

  getAllCalendarEntries() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(
      formatCalendarResults
    );
  }

  submitEntry(date, entry) {
    // const stringifiedData = JSON.stringify({
    //   [date]: entry
    // });

    // console.log(stringifiedData);
    return AsyncStorage.mergeItem(
      CALENDAR_STORAGE_KEY,
      JSON.stringify({ [date]: entry })
    );
  }

  removeEntry(date) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(async (results) => {
      console.log(results);
      const data = await JSON.parse(results);
      console.log(data);
      data[date] = undefined;
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        .then(console.log("yey"))
        .catch((err) => console.log(err));
    });
  }
}

export default new Api();
