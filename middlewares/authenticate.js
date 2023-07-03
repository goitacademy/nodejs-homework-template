const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/users")

const HttpError = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;

const authenticate = asyncHandler(async (req, res, next) => {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401);
  }
});

module.exports = authenticate;
