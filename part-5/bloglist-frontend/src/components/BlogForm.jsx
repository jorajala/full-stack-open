import { useState } from "react";

const BlogForm = ({ createBlog }) => {
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

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title: newTitle, author: newAuthor, url: newUrl });
  };

  return (
    <form onSubmit={addBlog}>
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
