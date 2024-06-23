import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer.js";
import blogsReducer from "./reducers/blogsReducer.js";
import usersRecuder from "./reducers/usersReducer.js";

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogsReducer,
      users: usersRecuder,
    },
  });
};

export default createStore;
