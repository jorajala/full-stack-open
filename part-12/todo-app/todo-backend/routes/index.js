const express = require("express");
const router = express.Router();

const configs = require("../util/config");

const redis = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* GET index data. */
router.get("/statistics", async (req, res) => {
  redis.getAsync("added_todos").then((num_added) => {
    res.send({ added_todos: num_added });
  });
});

module.exports = router;
