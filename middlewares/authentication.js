const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const User = require("../models");

const { SECRET_KEY } = process.env;

const authentication = async (req, _res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    };

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    req.user = user;

    next();
  } catch (error) {
    throw new Unauthorized("Not authorized");
  }
};

module.exports = authentication;
