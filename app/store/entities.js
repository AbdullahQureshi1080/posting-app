import { combineReducers } from "redux";
import authReducer from "./authSlice";
// import projectsReducer from "./projects";
// import usersReducer from "./users";

export default combineReducers({
  auth: authReducer,
  // projects: projectsReducer,
  // users: usersReducer,
});
