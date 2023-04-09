const jwt = require("jsonwebtoken");

const createError = require("http-errors");

const { User } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(createError(401, "User unauthorised"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(createError(401, "User unauthorised"));
    }
    req.user = user;
    next();
  } catch {
    next(createError(401, "User unauthorised"));
  }
};

module.exports = authenticate;
