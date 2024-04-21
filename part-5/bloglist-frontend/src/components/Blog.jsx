import { useState } from "react";

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [showDetails, setShowDetails] = useState(false);

  const allowRemove = () => {
    console.log(loggedUser, blog.user);
    return (
      loggedUser.name === blog.user.name &&
      loggedUser.username === blog.user.username
    );
  };

  const toggleDetails = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
    event.target.textContent = showDetails ? "details" : "hide";
  };

  const handleLike = () => {
    let asdf = addLike(blog.id);
    console.log("handlelike", asdf);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button type="button" onClick={toggleDetails}>
        details
      </button>
      {showDetails && (
        <div>
          <br /> {blog.url}
          <br /> likes: {blog.likes}{" "}
          <button type="button" onClick={handleLike}>
            like
          </button>
          <br /> {blog.user.name}
          {allowRemove() && (
            <div>
              <button onClick={() => removeBlog(blog)}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
