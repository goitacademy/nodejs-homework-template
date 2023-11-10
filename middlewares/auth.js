const HttpError = require("../helpers/HttpError");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    console.log(user);
    if (!user.token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = auth;
