import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Contacts from "../../../Screens/Contacts";
import Header from "../../Header";

import { ROUTES } from "../../../Constants/routes";

const HomeStack = createStackNavigator();

const HomeNavigation = () => (
  <HomeStack.Navigator
    initialRouteName={ROUTES.HOME}
    headerMode="screen"
    screenOptions={{
      header: ({ scene, previous, navigation }) => (
        <Header scene={scene} previous={previous} navigation={navigation} />
      ),
    }}
  >
    <HomeStack.Screen
      name={ROUTES.HOME}
      component={Contacts}
      options={{ headerTitle: "Lobby" }}
    ></HomeStack.Screen>
  </HomeStack.Navigator>
);

export default HomeNavigation;
