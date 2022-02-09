const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Unauthorized("Not authorized");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }

    next(error);
  }
};

module.exports = authenticate;
