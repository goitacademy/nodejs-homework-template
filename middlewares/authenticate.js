const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    if (!id) {
      throw new Unauthorized("Not authorized");
    }
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
