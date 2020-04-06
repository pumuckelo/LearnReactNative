import React from "react";
import { AsyncStorage } from "react-native";
import { CALENDAR_STORAGE_KEY } from "./_calender";

class Api {
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

  async removeEntry(date) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
      console.log(results);
      const data = JSON.parse(results);
      console.log(data);
      data[date] = undefined;
      delete data[date];
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
    });
  }
}

export default new Api();
