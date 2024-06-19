import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  let active = false;

  const notification = useSelector((state) => {
    let notification = state.notification;
    if (notification === null || notification === "") {
      active = false;
    } else {
      active = true;
    }
    return state.notification;
  });

  if (active) {
    return <div style={style}>{notification}</div>;
  } else {
    return null;
  }
};

export default Notification;
