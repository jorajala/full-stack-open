import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer.js";
import { showNotification } from "../reducers/notificationReducer.js";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setnewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const titleHandler = (event) => {
    setNewTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setnewAuthor(event.target.value);
  };
  const urlHandler = (event) => {
    setNewUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("addBlog", event);
    // @ts-ignore
    dispatch(addBlog({ title: newTitle, author: newAuthor, url: newUrl }));
    // @ts-ignore
    dispatch(showNotification(`Added blog: "${newTitle}" by ${newAuthor}`, 5));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:{" "}
        <input id="addblog-title" value={newTitle} onChange={titleHandler} />{" "}
        <br />
        author:{" "}
        <input
          id="addblog-author"
          value={newAuthor}
          onChange={authorHandler}
        />{" "}
        <br />
        url: <input
          id="addblog-url"
          value={newUrl}
          onChange={urlHandler}
        />{" "}
        <br />
      </div>
      <button id="addblog-button" type="submit">
        add
      </button>
    </form>
  );
};

export default BlogForm;
