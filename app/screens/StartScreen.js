import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";
import authStorage from "../auth/authStorage";
// import useAuth from "../auth/useAuth";
import { userCheck } from "../store/authSlice";

export default function StartScreen(props) {
  //   const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userToken = await authStorage.getToken();
      //   console.log(userToken);
      if (!userToken) {
        props.navigation.navigate("Login");
        return;
      }
      dispatch(userCheck(userToken));
      // dipatch(user)
      props.navigation.navigate("Home");
      // dispatch(tryAuthenticate(userToken));
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
