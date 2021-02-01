// Native Imports
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Button } from "react-native-paper";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

// Component Imports
import AppFormField from "../components/AppForm/AppFormField";
import SubmitButton from "../components/AppForm/SubmitButton";
import AppForm from "../components/AppForm/AppForm";
import ErrorMessage from "../components/AppForm/ErrorMessage";
import AppButton from "../components/AppButton";
// import ActivityIndicator from "../components/ActivityIndicator";

// Style Imports
import ComponentsStyle from "../styles/ComponentsStyle";

// Supporting Imports
import * as Yup from "yup";

// Api Imports
import authAPI from "../api/auth";
import userAPI from "../api/user";
import useAuth from "../auth/useAuth";
// import useApi from "../../hooks/useApi";

import {
  getAuthToken,
  userAuthentication,
  userVerify,
} from "../store/authSlice";
import { getProfileData, setProfileData } from "../store/userSlice";
import ProfileImageInput from "../components/ProfileImageInput";
import FormImagePicker from "../components/FormImagePicker";
// import { apiCallSuccess } from "../store/api";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";

var { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().min(3).label("Last Name"),
  about: Yup.string().label("About"),
  location: Yup.string().min(3).label("Location"),
  jobtitle: Yup.string().min(3).label("Job Title"),
  // image: Yup.string(),
});

const UserProfileScreen = ({ navigation, route }) => {
  // console.log(state.entities.auth.data);
  const [imageUri, onChangeImage] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  // console.log(imageUri);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userEmail = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  console.log(userId);
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error Reading an image", error);
    }
  };
  const handlePress = async () => {
    if (!imageUri) selectImage();
    // else if (imageUri != null) {
    //   const result = await userAPI.uploadProfileImage(imageUri);
    //   console.log(result);
    // }
    else
      Alert.alert("Delete", "Are you sure you want to delete the image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
  };
  const uploadImage = async () => {
    const uri = imageUri;
    console.log(uri);
    const childPath = `images/${userId}/${Math.random().toString(36)}`;
    console.log(childPath);
    // console.log(childPath)
    // console.log(firebase.auth().currentUser.uid);
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    console.log(blob);

    const task = firebase.storage().ref().child(childPath).put(blob);

    // console.log(task);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // savePostData(snapshot);
        console.log(snapshot);
        setDownloadURL(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log("An Error Occured", snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const handleSubmit = async ({
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    image,
  }) => {
    image = downloadURL;
    const result = {
      firstname,
      lastname,
      about,
      location,
      jobtitle,
      image,
    };
    console.log(result);
    setIsLoading(true);
    // const result = await userAPI.updateProfile(
    //   userEmail,
    //   firstname,
    //   lastname,
    //   about,
    //   location,
    //   jobtitle
    // );

    // if (!result.ok) {
    //   // console.log(result.data);
    //   setError(result.data);
    //   setIsLoading(false);
    //   return setSaveData(true);
    // }
    // setSaveData(false);
    // setIsLoading(false);
    // // console.log(result.data);
    // dispatch(setProfileData(result.data));
    // // logIn(result.data);
    // navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.child}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.titleText}>User Profile</Text>
          </View>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.mainContainer}>
              {!imageUri && (
                <MaterialCommunityIcons color="white" name="camera" size={40} />
              )}
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.profileImage} />
              )}
            </View>
          </TouchableWithoutFeedback>
          <Button
            title="save"
            color="white"
            style={{ backgroundColor: "green" }}
            onPress={uploadImage}
          />
          <AppForm
            initialValues={{
              firstname: "",
              lastname: "",
              about: "",
              location: "",
              jobtitle: "",
              // image: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {/* <FormImagePicker name="images" /> */}
            <View style={{ alignSelf: "center" }}>
              <ErrorMessage
                error="Not able to save User Data"
                visible={saveData}
              />
              <AppFormField
                style={ComponentsStyle.inputStyleSign}
                label="First Name"
                name="firstname"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
              <AppFormField
                style={ComponentsStyle.inputStyleSign}
                label="Last Name"
                name="lastname"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
              <AppFormField
                style={ComponentsStyle.inputStyleSign}
                label="Location"
                name="location"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
              <AppFormField
                style={ComponentsStyle.inputStyleSign}
                label="About"
                name="about"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
              <AppFormField
                style={ComponentsStyle.inputStyleSign}
                label="Job Title"
                name="jobtitle"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              {isLoading ? (
                <ActivityIndicator size="small" color="crimson" />
              ) : (
                <SubmitButton name="save" />
              )}
            </View>

            <View
              style={{
                marginVertical: 15,
                borderBottomColor: "#F4f4F2",
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            ></View>
          </AppForm>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  child: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  titleText: {
    // fontFamily: "Poppins-Bold",
    color: "#E8E8E8",
    fontSize: 30,
    marginVertical: 10,
    opacity: 0.6,
    alignSelf: "center",
  },
  text: {
    // fontFamily: "Poppins-Medium",
    color: "#E8E8E8",
    fontSize: 20,
    opacity: 0.8,
  },
  btnSign: {
    backgroundColor: "#495464",
    marginVertical: 10,
    width: width / 3,
    alignSelf: "center",
  },
  mainContainer: {
    backgroundColor: "grey",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
});

export default UserProfileScreen;
