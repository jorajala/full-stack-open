require("dotenv").config();

const PORT = 3003;
const HOSTNAME = "127.0.0.1";
let MONGODB_URI = "mongodb://localhost/bloglist";
const TEST_MONGODB_URI = "mongodb://localhost/testBloglist";

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  HOSTNAME,
};
