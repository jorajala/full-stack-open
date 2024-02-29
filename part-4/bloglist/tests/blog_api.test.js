const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const API = "/api/blogs/";
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
    .get(API)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 3 blogs", async () => {
  let response = await api.get(API);
  assert.strictEqual(response.body.length, testBlogs.length);
});

test("blog id field", async () => {
  let response = await api.get(API).expect(200);
  assert(response.body[0].id);
});

test("blog can be added", async () => {
  await api.post(API).send(testBlogs[0]).expect(201);

  let response = await api.get(API);

  assert.strictEqual(response.body.length, testBlogs.length + 1);
});

test("undefined likes set to 0", async () => {
  let blog = {
    title: "test1",
    author: "test1",
    url: "",
  };
  let postResponse = await api.post(API).send(blog).expect(201);

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

  await api.post(API).send(missingTitle).expect(400);
  await api.post(API).send(missingUrl).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
