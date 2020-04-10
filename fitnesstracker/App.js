import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import History from "./components/History/History";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./utils/colors";
import EntryNavigation from "./components/Navigation/EntryNavigation";
// import A

export default function App() {
  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
    "AvenirLTStd-Medium": require("./assets/fonts/AvenirLTStd-Medium.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Tab = createBottomTabNavigator();

  return (
    <Provider store={createStore(reducer)}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.newbackground}
      />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.newprimary,
            inactiveTintColor: colors.newsecondary,
            labelStyle: { fontFamily: "AvenirLTStd-Medium" },
            // activeBackgroundColor: colors.newbackground,
            // inactiveBackgroundColor: colors.newbackground,
            style: {
              // maxHeight: 200,
            },
            tabStyle: {},
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused, color }) => (
                <MaterialIcons name="add-box" size={25} color={color} />
              ),
            }}
            name="New Entry"
            component={AddEntry}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="history" size={25} color={color} />
              ),
              title: "History",
            }}
            name="EntryNavigation"
            component={EntryNavigation}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
