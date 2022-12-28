const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { Unauthorized } = require("http-errors");
require("dotenv").config();

const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

const userToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;

    const [tokenBearer, token] = authorization.split(" ");

    if (tokenBearer !== "Bearer" || token === "") {
      next(new Unauthorized("Not authorized"));
    }

    const { id } = jwt.verify(token, USER_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(new Unauthorized("Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Not authorized"));
  }
};

module.exports = {
  userToken,
};
