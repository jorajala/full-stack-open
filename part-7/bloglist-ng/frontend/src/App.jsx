import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog.jsx";
import BlogForm from "./components/BlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import { showNotification } from "./reducers/notificationReducer.js";
import { initBlogs } from "./reducers/blogsReducer.js";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    blogService.getAll().then(() => dispatch(initBlogs()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // @ts-ignore
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON);
      console.log("user", user);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (ex) {
      console.error("login failed: ", ex.response.data.error);
      showNotification(ex.response.data.error, true);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBloglistUser");
    console.log("logout: ", user);
    showNotification(`User ${user.name} logged out`, false);
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={user} />
      ))}
    </div>
  );

  const userInfo = () => (
    <p>
      {user.name} logged in
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </p>
  );

  return (
    <div>
      {user && <h2>Blogs</h2>}
      <Notification />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <div>
          {userInfo()}
          {/* @ts-ignore */}
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
