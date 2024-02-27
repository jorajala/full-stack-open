const dummy = (blogs) => {
  blogs;
  return 1;
};

const totalLikes = (blogs) => {
  let total = blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
  return total;
};

const favoriteBlog = (blogs) => {
  let max = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === max);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
