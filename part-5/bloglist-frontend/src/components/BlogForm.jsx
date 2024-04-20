const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title: <input value={props.title} onChange={props.titleHandler} />{" "}
        <br />
        author: <input
          value={props.author}
          onChange={props.authorHandler}
        />{" "}
        <br />
        url: <input value={props.url} onChange={props.urlHandler} /> <br />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default BlogForm;
