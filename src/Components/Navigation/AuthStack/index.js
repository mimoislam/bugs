import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OnBoarding from "../../../Screens/OnBoarding";
import PhoneVerify from "../../../Screens/PhoneVerify";

import { ROUTES } from "../../../Constants/routes";

const AuthStack = createStackNavigator();

const AuthNavigation = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name={ROUTES.ONBOARDING}
      component={OnBoarding}
    ></AuthStack.Screen>
    <AuthStack.Screen
      name={ROUTES.PHONEVERIFY}
      component={PhoneVerify}
    ></AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthNavigation;
