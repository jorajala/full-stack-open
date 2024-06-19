import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const createStore = () => {
  return configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer,
    },
  });
};

export default createStore;
