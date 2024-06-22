import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogsReducer.js";
import { showNotification } from "../reducers/notificationReducer.js";
import { Button, DetailsDiv, BlogDiv } from "../styled-components.js";

const Blog = ({ blog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
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
    console.log("handleLike", blog.id);
    // @ts-ignore
    dispatch(addLike(blog.id));
    // @ts-ignore
    dispatch(showNotification(`Added like to: "${blog.title}"`, 5));
  };

  const handleRemove = () => {
    // @ts-ignore
    dispatch(removeBlog(blog.id));
    // @ts-ignore
    dispatch(showNotification(`removed: "${blog.title}"`, 5));
  };

  return (
    <BlogDiv className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <Button type="button" onClick={toggleDetails}>
        details
      </Button>
      {showDetails && (
        <DetailsDiv className="blog-details">
          <br /> {blog.url}
          <br /> likes: {blog.likes}{" "}
          <Button type="button" onClick={handleLike}>
            like
          </Button>
          <br /> {blog.user.name}
          {allowRemove() && (
            <div>
              <Button onClick={() => handleRemove()}>remove</Button>
            </div>
          )}
        </DetailsDiv>
      )}
    </BlogDiv>
  );
};

export default Blog;
