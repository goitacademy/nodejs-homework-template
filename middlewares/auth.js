const { RequestError } = require("../helpers/RequestError.js");
const { User } = require("../models/user.js");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  const { authorization } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw RequestError(401, "token type is not valid");
  }
  if (!token) {
    throw RequestError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, "JWT_SECRET");
    const user = await User.findById(id);
    if (!user) {
      throw RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw RequestError(401, "jwt token is not valid");
    }
    throw error;
  }
}

module.exports = auth;
