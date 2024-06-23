import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", className: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      let { message, className } = action.payload;
      return { message, className };
    },
    clearMessage() {
      return { message: "", className: "" };
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export const showNotification = (message, delay) => {
  console.log("shownotification", message, delay);
  return async (dispatch) => {
    let d = delay * 1000;
    dispatch(setMessage({ message: message, className: "notification" }));
    await new Promise((r) => setTimeout(r, d));
    dispatch(clearMessage());
  };
};

export const showError = (message, delay) => {
  return async (dispatch) => {
    let d = delay * 1000;
    dispatch(setMessage({ message: message, className: "error" }));
    await new Promise((r) => setTimeout(r, d));
    dispatch(clearMessage());
  };
};

export default notificationSlice.reducer;
