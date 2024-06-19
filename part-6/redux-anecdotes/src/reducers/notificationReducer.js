import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export const setNotification = (msg, delay) => {
  return async (dispatch) => {
    let d = delay * 1000;
    dispatch(setMessage(msg));
    await new Promise((r) => setTimeout(r, d));
    dispatch(setMessage(""));
  };
};

export default notificationSlice.reducer;
