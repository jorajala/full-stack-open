const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

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

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("sum the likes of a list of blogs", () => {
    let result = listHelper.totalLikes(testBlogs);
    assert.strictEqual(result, 13);
  });
});

describe("favorite blog", () => {
  test("blog with highest favorites", () => {
    let result = listHelper.favoriteBlog(testBlogs);
    assert.deepStrictEqual(testBlogs[2], result);
  });
});
