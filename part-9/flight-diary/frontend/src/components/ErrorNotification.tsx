const ErrorNotification = ({ errorText }: { errorText: string }) => {
  if (errorText === "") {
    return <></>;
  } else {
    return <div style={{ color: "red" }}>{errorText}</div>;
  }
};

export default ErrorNotification;
