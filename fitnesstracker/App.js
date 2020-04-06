import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddEntry from "./components/AddEntry/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import History from "./components/History/History";
// import A

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf")
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ fontSize: 80 }}>
        {/* <AddEntry /> */}
        <History />
      </View>
    </Provider>
  );
}
