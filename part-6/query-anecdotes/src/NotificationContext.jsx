/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  console.log("notificationReducer", action);
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

// @ts-ignore
const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [nofitication, notificationDispatch] = useReducer(
    notificationReducer,
    0
  );

  return (
    <NotificationContext.Provider value={[nofitication, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
