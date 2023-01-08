const { User } = require("../models");
const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw HttpError(401);
    }
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ _id: payload.id });
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = checkJwt;
