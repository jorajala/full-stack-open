const Notification = ({ data }) => {
  if (data.message === null) {
    return null;
  }

  return (
    <div className={data.isError ? "error" : "notification"}>
      {data.message}
    </div>
  );
};

export default Notification;
