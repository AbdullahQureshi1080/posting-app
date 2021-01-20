import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useSelector } from "react-redux";
import useAuth from "../auth/useAuth";

import ImageInputList from "../components/ImageInputList.js";
// import * as Permissions from "expo-permissions";

export default function HomeScreen({ navigation }) {
  const { logOut } = useAuth(navigation);
  const state = useSelector((state) => state);
  const token = state.entities.auth.token;
  const data = state.entities.auth.data;
  console.log(data);
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Text>This the Home Screen. Welcome to the app !</Text>
      <Text>Trying to make it work</Text>
      <Text>{token}</Text>
      <Text>{data.id}</Text>
      <Text>{data.firstname}</Text>
      <Text>{data.lastname}</Text>
      <Text>{data.email}</Text>
      <Button
        title="Go to Post Edit Screen"
        onPress={() => navigation.navigate("CreatePost")}
      />
      {/* <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      /> */}
      <View
        style={{
          alignSelf: "center",
          marginVertical: 35,
        }}
      >
        <Button title="Logout" onPress={logOut} color="#f194ff" />
      </View>
    </View>
  );
}
