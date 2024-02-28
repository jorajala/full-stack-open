const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

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
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 3 blogs", async () => {
  let response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, testBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
