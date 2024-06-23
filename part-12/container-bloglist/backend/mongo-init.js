/* eslint-disable no-undef */
db.createUser({
  user: "tunk",
  pwd: "asdf",
  roles: [
    {
      role: "dbOwner",
      db: "bloglist",
    },
  ],
});

db.createCollection("blogs");
db.createCollection("users");
