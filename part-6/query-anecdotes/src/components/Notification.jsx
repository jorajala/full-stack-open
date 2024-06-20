import { useNotificationValue } from "../NotificationContext.jsx";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const note = useNotificationValue();

  if (note === "" || note === null) {
    return null;
  } else {
    return <div style={style}>{note}</div>;
  }
};

export default Notification;
