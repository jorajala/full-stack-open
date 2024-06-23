import { useSelector } from "react-redux";
import { Header } from "../styled-components.js";

const Users = () => {
  // @ts-ignore
  let users = useSelector((state) => state.users);
  // @ts-ignore
  let blogs = useSelector((state) => state.blogs);
  console.log("userState", users);

  let userInfoRows = [];

  users.forEach((user) => {
    let count = 0;
    blogs.map((blog) => {
      if (blog.user.username === user.username) {
        count += 1;
      }
    });

    userInfoRows.push(
      <li key={user.id}>
        {user.name} {count}
      </li>,
    );
  });

  return (
    <div>
      <Header>Users</Header>
      <p>blogs created per user:</p>
      <ul>{userInfoRows}</ul>
    </div>
  );
};

export default Users;
