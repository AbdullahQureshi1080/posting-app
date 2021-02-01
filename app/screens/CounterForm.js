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
  Button,
  TextInput,
} from "react-native";
import { Formik } from "formik";
// import { Button } from "react-native-paper";

// Component Imports
import AppFormField from "../components/AppForm/AppFormField";
import SubmitButton from "../components/AppForm/SubmitButton";
import AppForm from "../components/AppForm/AppForm";
// import ErrorMessage from "../components/AppForm/ErrorMessage";
// import AppButton from "../components/AppButton";
// import ActivityIndicator from "../components/ActivityIndicator";

// Style Imports
import ComponentsStyle from "../styles/ComponentsStyle";

// Supporting Imports
import * as Yup from "yup";

// // Api Imports
// import authAPI from "../api/auth";
// import useAuth from "../auth/useAuth";
// // import useApi from "../../hooks/useApi";

// import {
//   getAuthToken,
//   userAuthentication,
//   userVerify,
// } from "../store/authSlice";
// // import { apiCallSuccess } from "../store/api";

var { width, height } = Dimensions.get("window");

const CounterScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  console.log(counter);
  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.titleText}>Counter Form</Text>
        </View>
        <Formik
          initialValues={{
            title: "",
            description: "",
            counter: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.email}
                style={{ color: "white" }}
                placeholder="Title"
                placeholderTextColor="white"
              />
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                style={{ color: "white" }}
                placeholder="Description"
                placeholderTextColor="white"
              />
              <TextInput
                onChangeText={handleChange("counter")}
                onBlur={handleBlur("counter")}
                value={(values.counter = counter.toString())}
                style={{ color: "white" }}
                placeholder={counter.toString()}
                placeholderTextColor="white"
              />
              <Button title="plus" onPress={handleIncrement} />
              <Button title="minus" onPress={handleDecrement} />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </View>
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
});

export default CounterScreen;
