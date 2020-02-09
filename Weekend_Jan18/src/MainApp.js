
import React from "react";
import { createAppContainer  } from "react-navigation";
import {createDrawerNavigator  } from "react-navigation-drawer";

import {
    Image,
  } from "react-native";
import CustomDrawerNavigator from "./components/CustomeDrawerNavigator/CustomeDrawerNavigator";
import Home from "./views/Home";
import Settings from "./views/Settings";
import About from "./views/About";

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        //   <Ionicons name="md-home" style={{ color: tintColor }} />
        <Image
        source={require('./assets/gift.jpg')}
        style={{height:10,width:20,}}
        />
        ),
        drawerLabel: "Home"
      },
      screen: Home
    },

    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        //   <Ionicons name="md-settings" style={{ color: tintColor }} />
        <Image
        source={require('./assets/gift.jpg')}
        style={{height:10,width:20,}}
        />
        ),
        drawerLabel: "Settings"
      },
      screen: Settings
    },

    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        //   <Ionicons name="ios-person" style={{ color: tintColor }} />
        <Image
        source={require('./assets/gift.jpg')}
        style={{height:10,width:20,}}
        />
        ),
        drawerLabel: "About"
      },
      screen: About
    }
  },
  {
    contentComponent: CustomDrawerNavigator
  }
);

const MainApp = createAppContainer(MainNavigator);
export default MainApp;