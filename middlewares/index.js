const { HttpError } = require("../helpers/index");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/user");

const jwt = require("jsonwebtoken");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  const [type, token] = authHeader.split(" ");

  if (type != "Bearer") {
    throw Unauthorized("Not authorized");
  }
  if (!token) {
    throw Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebToken") {
      throw Unauthorized("Not authorized");
    }
    throw error;
  }

  next();
}

module.exports = {
  validateBody,
  auth,
};
