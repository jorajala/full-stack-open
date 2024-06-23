import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users.js";

const userSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initUsers = () => {
  return async (dispatch) => {
    const blogs = await userService.getAll();
    dispatch(setUsers(blogs));
  };
};

export default userSlice.reducer;
