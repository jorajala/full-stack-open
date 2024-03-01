const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  let users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username) {
    if (username.length < 3) {
      response
        .status(400)
        .json({ error: "username must be at least 3 characters" })
        .end();
    }
  } else {
    response.status(400).json({ error: "username missing" }).end();
  }
  if (password) {
    if (password.length < 3) {
      response
        .status(400)
        .json({ error: "password must be at least 3 characters" })
        .end();
    }
  } else {
    response.status(400).json({ error: "password missing" }).end();
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
