// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import reducer from "./bugs";
import reducer from "./reducer";
import logger from "./middleware/logger";
// import toast from "./middleware/toast";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      api,
    ],
  });
}