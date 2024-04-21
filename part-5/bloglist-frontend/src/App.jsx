import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog.jsx";
import BlogForm from "./components/BlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notificationData, setNotificationData] = useState({
    message: null,
    isError: false,
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

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

  const showNotification = (message, isError) => {
    setNotificationData({ message, isError });
    setTimeout(() => {
      setNotificationData({ message: null, isError: false });
    }, 3000);
  };

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));

        showNotification(
          `Added blog: "${returnedBlog.title}" by ${returnedBlog.author}`,
        );
        // @ts-ignore
        blogFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeBlog = (blog) => {
    console.log("remove blog id", blog);

    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      console.log("removeblog cancel");
      return;
    }
    blogService
      .remove(blog.id)
      .then(() => {
        blogService
          .getAll()
          .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addLike = (id) => {
    console.log("addlike", id);
    let blog = blogs.find((b) => b.id === id);
    console.log("addlike to", blog);
    let newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService.update(blog.id, newBlog).then(() => {
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    });
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          loggedUser={user}
        />
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
      <Notification data={notificationData} />
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
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
