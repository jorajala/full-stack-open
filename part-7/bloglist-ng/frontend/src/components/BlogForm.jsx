import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer.js";
import { showNotification } from "../reducers/notificationReducer.js";
import { Button, Input } from "../styled-components.js";

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
        <Input id="addblog-title" value={newTitle} onChange={titleHandler} />{" "}
        <br />
        author:{" "}
        <Input
          id="addblog-author"
          value={newAuthor}
          onChange={authorHandler}
        />{" "}
        <br />
        url: <Input
          id="addblog-url"
          value={newUrl}
          onChange={urlHandler}
        />{" "}
        <br />
      </div>
      <Button id="addblog-button" type="submit">
        add
      </Button>
    </form>
  );
};

export default BlogForm;
