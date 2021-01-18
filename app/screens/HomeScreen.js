import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import useAuth from "../auth/useAuth";

export default function HomeScreen({navigation}) {
  const { logOut } = useAuth(navigation);
  const state = useSelector((state) => state);
  const token = state.entities.auth.token;
  return (
    <View>
      <Text>This the Home Screen. Welcome to the app !</Text>
      <Text>Trying to make it work</Text>
      <Text>{token}</Text>
      <Button title="Logout" onPress={logOut} />
    </View>
  );
}
