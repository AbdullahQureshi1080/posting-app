import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Button, Image } from "react-native";
import { useSelector } from "react-redux";
import useAuth from "../auth/useAuth";
import userAPI from "../api/user";

import ImageInputList from "../components/ImageInputList.js";
import { setProfileData } from "../store/userSlice";
// import * as Permissions from "expo-permissions";

export default function HomeScreen({ navigation }) {
  // () => getProfileData(data.email);
  const { logOut } = useAuth(navigation);
  const state = useSelector((state) => state);
  console.log(state);
  const profile = state.entities.user.profile;
  const token = state.entities.auth.token;
  const data = state.entities.auth.data;
  // const email = data.email;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const getUserData = async (email) => {
  //     const profileData = await userAPI.userProfile(email);
  //     return profileData;
  //   };
  //   const dataProfile = getUserData(email);
  //   dispatch(setProfileData(dataProfile));
  // }, []);

  console.log(profile);
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Text>This the Home Screen. Welcome to the app !</Text>
      <Text>Trying to make it work</Text>
      <Text>{token}</Text>
      {/* {data != null ? (
        <View>
          <Text>{token}</Text>
          <Text>{data.id}</Text>
          <Text>{data.firstname}</Text>
          <Text>{data.lastname}</Text>
          <Text>{data.email}</Text>
        </View>
      ) : (
        <View>
          <Text>No User Data</Text>
        </View>d
      )} */}
      {/* <Button
        title="Update Profile"
        onPress={() => navigation.navigate("UserProfile")}
      /> */}
      <Button
        title="Go to Post Edit Screen"
        onPress={() => navigation.navigate("CreatePost")}
      />
      {/* <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      /> */}
      {"about" in profile ? (
        <View>
          <Text>{profile.firstname}</Text>
          <Text>{profile.lastname}</Text>
          <Text>{profile.about}</Text>
          <Text>{profile.location}</Text>
          <Text>{profile.jobtitle}</Text>
        </View>
      ) : (
        <View>
          <Text>Profile Not Set</Text>
          <Button
            title="Update Profile"
            onPress={() => navigation.navigate("UserProfile", { data: data })}
          />
        </View>
      )}
      {/* <Button
        title="Update Profile"
        onPress={() => navigation.navigate("UserProfile")}
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
