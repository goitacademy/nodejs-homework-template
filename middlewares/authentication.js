const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "User is not in the database."));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Error token"));
  }
};

module.exports = authentication;
