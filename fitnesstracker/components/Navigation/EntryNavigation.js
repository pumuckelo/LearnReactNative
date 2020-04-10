import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import History from "../History/History";
import Entry from "../History/Entry";
import EntryDetail from "../History/EntryDetail";
import AddEntry from "../AddEntry/AddEntry";

const Stack = createStackNavigator();

const EntryNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="EntryDetail" component={EntryDetail} />
      <Stack.Screen name="EditEntry" component={AddEntry} />
    </Stack.Navigator>
  );
};

export default EntryNavigation;
