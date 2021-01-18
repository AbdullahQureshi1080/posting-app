import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

//  api Url Constants
export const LOGIN_URL = "/login";
export const REGISTER_URL= "/register";
