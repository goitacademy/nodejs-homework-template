const { makeError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const isAuthorized = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      next(makeError(401));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      next(makeError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    if (error.status === 401) {
      next(makeError(401));
    }

    next(error);
  }
};

module.exports = isAuthorized;
