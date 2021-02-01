import { combineReducers } from "redux";
import authReducer from "./authSlice";
// import projectsReducer from "./projects";
import userReducer from "./userSlice";

export default combineReducers({
  auth: authReducer,
  // projects: projectsReducer,
  user: userReducer,
});
