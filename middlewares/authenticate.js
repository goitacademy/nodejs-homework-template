const { verify } = require("jsonwebtoken");
const { config } = require("dotenv");

const { User } = require("../models");
const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");

config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = { authenticate: controllerWrapper(authenticate) };
