import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigation from "../../../Components/Navigation/AuthStack";
import HomeNavigation from "../../../Components/Navigation/Home";

import { ROUTES } from "../../../Constants/routes";

const RootStack = createStackNavigator();

const RootNavigation = () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name={ROUTES.ONBOARDING}
        component={AuthNavigation}
      ></RootStack.Screen>
      <RootStack.Screen
        name={ROUTES.HOME}
        component={HomeNavigation}
      ></RootStack.Screen>
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootNavigation;
