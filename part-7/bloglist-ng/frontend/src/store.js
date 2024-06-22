import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer.js";

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
    },
  });
};

export default createStore;
