const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { SECRET_KEY } = process.env;

const current = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (!bearer) {
    throw new Unauthorized("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if ((error.message = "Invalid sugnature")) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = current;
