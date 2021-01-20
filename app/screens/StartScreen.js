import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";
import authStorage from "../auth/authStorage";
// import useAuth from "../auth/useAuth";
import { userVerify, assignUserData } from "../store/authSlice";

export default function StartScreen(props) {
  //   const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userToken = await authStorage.getToken();
      const userData = await authStorage.getUser();
      if (!userToken) {
        props.navigation.navigate("Login");
        return;
      }
      dispatch(userVerify(userToken));
      dispatch(assignUserData(userData));
      props.navigation.navigate("Home");
    };
    tryLogin();
    // add dispatch to dependency
  }, []);
  return (
    <View>
      <ActivityIndicator size="small" />
    </View>
  );
}
