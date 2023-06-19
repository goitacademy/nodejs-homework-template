/** @format */

const { RequestError } = require("../helpers");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, `Not authorized`);
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw RequestError(401, `Not authorized`);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
