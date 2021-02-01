import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

//  api Url Constants
export const LOGIN_URL = "user/login";
export const REGISTER_URL = "user/register";
export const UPDATE_PROFILE_URL = "profile/updateProfile";
export const GET_PROFILE_URL = "profile/getProfile";
