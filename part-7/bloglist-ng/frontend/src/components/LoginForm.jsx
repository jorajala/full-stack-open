import { Button, Input } from "../styled-components.js";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <Input
            id="username"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          ></Input>
        </div>
        <div>
          password
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          ></Input>
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
