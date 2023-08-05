const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  // if we don't get "bearer token" we can't split it. Result'll be undefined and backend'll crash.
  // That's why we make it an empty row first
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user.token) {
      // (!user || !user.token || user.token !== token)
      next(HttpError(401, "Not authorized"));
    }
    // adding to req.body an info about user who made a request
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
