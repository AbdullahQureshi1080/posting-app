import "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import PostEditScreen from "./app/screens/PostEditScreen";
import configureStore from "./app/store/configureStore";
// import authStorage from "./app/auth/authStorage";
import StartScreen from "./app/screens/StartScreen";
// import { store } from "./app/store/store";
const store = configureStore();

// import authStorage from "./app/auth/authStorage";

const stack = createStackNavigator();
export default function App() {
  // const [user, setUser] = useState();
  // // const state = useSelector((state) => state);
  // // const token = state.entities.auth.token;
  // const restoreUser = async () => {
  //   const user = await authStorage.getUser();
  //   console.log(user);
  //   if (user) setUser(user);
  //   else setUser(null);
  // };
  // useEffect(() => {
  //   restoreUser();
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="StartScreen" component={StartScreen} />
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Home" component={HomeScreen} />
          <stack.Screen name="CreatePost" component={PostEditScreen} />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
