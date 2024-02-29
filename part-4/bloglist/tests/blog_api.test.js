const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const BLOGS = "/api/blogs/";
const USERS = "/api/users/";

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post(USERS)
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post(USERS)
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

let testBlogs = [
  {
    title: "test1",
    author: "test1",
    url: "",
    likes: 1,
  },
  {
    title: "test2",
    author: "test2",
    url: "",
    likes: 2,
  },
  {
    title: "test3",
    author: "test3",
    url: "",
    likes: 10,
  },
];

describe("welp", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(testBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(testBlogs[1]);
    await blogObject.save();
    blogObject = new Blog(testBlogs[2]);
    await blogObject.save();
  });

  test("blogs are returned as json", async () => {
    await api
      .get(BLOGS)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are 3 blogs", async () => {
    let response = await api.get(BLOGS);
    assert.strictEqual(response.body.length, testBlogs.length);
  });

  test("blog has a field named id", async () => {
    let response = await api.get(BLOGS).expect(200);
    assert(response.body[0].id);
  });

  test("new blog can be added", async () => {
    await api.post(BLOGS).send(testBlogs[0]).expect(201);

    let response = await api.get(BLOGS);

    assert.strictEqual(response.body.length, testBlogs.length + 1);
  });

  test("undefined likes set to 0", async () => {
    let blog = {
      title: "test1",
      author: "test1",
      url: "",
    };
    let postResponse = await api.post(BLOGS).send(blog).expect(201);

    let getResponse = await api
      .get(`/api/blogs/${postResponse.body.id}`)
      .expect(200);

    assert.strictEqual(getResponse.body.likes, 0);
  });

  test("missing title or url returns 400", async () => {
    let missingTitle = {
      author: "missing title tester",
      url: "",
      likes: 1,
    };
    let missingUrl = {
      title: undefined,
      author: "missing url tester",

      likes: 1,
    };

    await api.post(BLOGS).send(missingTitle).expect(400);
    await api.post(BLOGS).send(missingUrl).expect(400);
  });

  test("delete blog", async () => {
    let deleteMe = {
      title: "delete me pls",
      author: "delete tester",
      url: "",
      likes: 1,
    };

    let postResponse = await api.post(BLOGS).send(deleteMe).expect(201);
    let id = postResponse.body.id;

    await api.delete(BLOGS.concat(id)).send(id).expect(204);
    await api.get(BLOGS.concat(id)).expect(404);
  });

  test("update existing blog", async () => {
    let updateMe = {
      title: "update me",
      author: "the og",
      url: "",
      likes: 666,
    };
    let postResponse = await api.post(BLOGS).send(updateMe).expect(201);
    let updated = updateMe;
    updated.likes = 0;

    let putResponse = await api
      .put(BLOGS.concat("", postResponse.body.id))
      .send(updated)
      .expect(200);

    assert.strictEqual(updated.likes, putResponse.body.likes);
  });
});
after(async () => {
  await mongoose.connection.close();
});
