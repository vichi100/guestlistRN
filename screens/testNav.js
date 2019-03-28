import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import MyHomeScreen from "./MyHomeScreen";
import OtherScreen from "./OtherScreen";
import SignInScreen from "./SignInScreen";
import AuthLoadingScreen from "./AuthLoadingScreen"

const AppStack = createStackNavigator({ Home: MyHomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,  
  },
  {
    initialRouteName: 'AuthLoading',
  }
));