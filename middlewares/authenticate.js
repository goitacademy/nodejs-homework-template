const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { User } = require("../models");

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Авторизируйтесь");
    }
    const user = await User.findOne({ token });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Unauthorized("Not authorized");
  }
};

module.exports = authenticate;
