const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { JWT_SECRET } = process.env;
const { User } = require("../models/user");

async function auth(req, res, next) {
  const authHeaders = req.headers.authorization || "";
  const [type, token] = authHeaders.split(" ");
  if (type !== "Bearer") {
    next(HttpError(401, "Not authorized "));
  }
  if (!token) {
    next(HttpError(401, "Not authorized "));
  }
  try {
    const { id } = await jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      next(HttpError(401, "Not authorized"));
    }
    next(error);
  }
  next();
}
module.exports = auth;
