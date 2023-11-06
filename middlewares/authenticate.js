const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const { User } = require("../models/User");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Invalid authentication format"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, "Authentication failed"));
  }
};

module.exports = authenticate;
