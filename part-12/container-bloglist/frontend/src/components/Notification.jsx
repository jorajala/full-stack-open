import { useSelector } from "react-redux";

const Notification = () => {
  // @ts-ignore
  let notificationState = useSelector((state) => state.notification);

  if (notificationState.message === null || notificationState.message === "") {
    return null;
  } else {
    return (
      <div className={notificationState.className}>
        {notificationState.message}
      </div>
    );
  }
};

export default Notification;
