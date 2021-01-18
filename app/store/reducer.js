import { combineReducers } from "redux";

import entitiesReducer from "./entities";
// import authReducer from "./authSlice";
export default combineReducers({
  entities: entitiesReducer,
  // auth: authReducer,
});
