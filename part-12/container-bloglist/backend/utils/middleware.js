const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  if (request.method === "POST" || request.method === "DELETE") {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      request.token = authorization.replace("Bearer ", "");
    }
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.method === "POST" || request.method === "DELETE") {
    let secret = process.env.SECRET;

    if (!secret) {
      return response.status(500).json({ error: "secret is null" });
    }
    const decodedToken = jwt.verify(request.token, secret);
    if (!decodedToken) {
      return response.status(404).json({ error: "invalid token" });
    }

    if (typeof decodedToken === "string") {
      let err = "error verifying token";
      console.error(err);
      return response.status(500).json({ error: err });
    }

    let user = await User.findById(decodedToken.id);
    request.user = user;
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
