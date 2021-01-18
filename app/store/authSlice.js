import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { apiCallBegan, LOGIN_URL, REGISTER_URL } from "./api";
// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    userId: "",
    // lastFetch: null,
    data: {},
  },
  reducers: {
    // actions => action handlers

    authenticate: (auth, action) => {
      auth.loading = true;
      auth.token = action.payload;
    },

    loginRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    loginRequest: (auth, action) => {
      auth.loading = true;
    },

    authenticatedUser: (auth, action) => {
      auth.token = action.payload;
      auth.loading = false;
    },
    registerRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    registerRequest: (auth, action) => {
      auth.loading = true;
    },
    userRegistration: (auth, action) => {
      auth.data = action.payload;
      auth.loading = false;
    },
    logout: (auth, action) => {
      auth.token = null;
    },
  },
});

// console.log(slice);

const {
  loginRequestFailed,
  loginRequest,
  authenticatedUser,
  registerRequest,
  registerRequestFailed,
  userRegistration,
  authenticate,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

// Action Creators

// ()=>{} signature function

export const userAuthentication = (user) =>
  apiCallBegan({
    url: LOGIN_URL,
    method: "post",
    data: user,
    onStart: loginRequest.type,
    onSuccess: authenticatedUser.type,
    onError: loginRequestFailed.type,
  });
export const userCheck = (user) => ({
  type: authenticatedUser.type,
  payload: user,
});

export const assignUserData = (user) => ({
  type: userRegistration.type,
  payload: user,
});
// export const tryAuthenticate = (token) => {
//   return {
//     type: authenticate.type,
//     payload: {
//       token,
//     },
//   };
// };
export const registerUser = (userData) =>
  apiCallBegan({
    url: REGISTER_URL,
    method: "post",
    data: userData,
    onStart: registerRequest.type,
    onSuccess: userRegistration.type,
    onError: registerRequestFailed.type,
  });

// Selectors - to get the current store state

// export const getAuthToken = () => {
//   const state = useSelector((state) => state);
//   const token = state.entities.auth.token;
//   return token;
// };
