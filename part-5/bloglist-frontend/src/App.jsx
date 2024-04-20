import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setnewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notificationData, setNotificationData] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      setNotificationData({ message: null, isError: null });
    }, 3000);
  };

  const titleHandler = (event) => {
    setNewTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setnewAuthor(event.target.value);
  };
  const urlHandler = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    console.log("addblog entry");
    let newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    console.log("newblog", newBlog);

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setnewAuthor("");
        setNewUrl("");
        showNotification(
          `Added blog: "${returnedBlog.title}" by ${returnedBlog.author}`,
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
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
      <h1>Blogs</h1>
      <Notification data={notificationData} />
      {!user && loginForm()}
      {user && (
        <div>
          {userInfo()}
          <BlogForm
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            titleHandler={titleHandler}
            authorHandler={authorHandler}
            urlHandler={urlHandler}
            addBlog={addBlog}
          />
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
