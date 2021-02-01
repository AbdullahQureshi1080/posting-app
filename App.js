import "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import PostEditScreen from "./app/screens/PostEditScreen";
import configureStore from "./app/store/configureStore";
// import authStorage from "./app/auth/authStorage";
import StartScreen from "./app/screens/StartScreen";
import * as firebase from "firebase";

import {
  Button,
  Menu,
  Divider,
  Provider as PaperProvider,
} from "react-native-paper";
import CounterScreen from "./app/screens/CounterForm";
import UserProfileScreen from "./app/screens/UserProfileScreen";
// import { store } from "./app/store/store";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "./app/config/config.js";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
firebase.default.initializeApp(firebaseConfig);

const store = configureStore();

// import authStorage from "./app/auth/authStorage";
const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

export default function App() {
  const AppStack = () => {
    return (
      <stack.Navigator>
        <stack.Screen name="StartScreen" component={StartScreen} />
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Counter" component={CounterScreen} />
        <stack.Screen name="UserProfile" component={UserProfileScreen} />
        <stack.Screen name="CreatePost" component={PostEditScreen} />
      </stack.Navigator>
    );
  };

  const CreateStack = () => {
    return (
      <stack.Navigator>
        <stack.Screen name="Modal" component={Modal} />
        <stack.Screen name="Create Post" component={PostEditScreen} />
      </stack.Navigator>
    );
  };

  const Modal = ({ navigation }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
      <View
        style={{
          height: "20%",
          backgroundColor: "black",
          color: "white",
          bottom: 0,
          position: "absolute",
          left: "50%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
        >
          <Text style={{ color: "white" }}>Hiya !</Text>
        </View>
      </View>
    );
  };
  // const [Pressed, setPressed] = useState(true);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="App">
          <Tab.Screen name="App" component={AppStack} />
          <Tab.Screen
            name="Create"
            component={CreateStack}
            options={{
              tabBarVisible: true,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
