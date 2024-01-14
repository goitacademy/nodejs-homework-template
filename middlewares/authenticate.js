const { envsConfig } = require("../configs");
const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authorize = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401, "Unauthorized"));
  }

  try {
    const { id } = await jwt.verify(token, envsConfig.jwtSecret);
    const user = await User.findById(id);
    if (!token || !user.token || user.token !== token) {
      next(httpError(401, "Unauthorized"));
    }

    req.user = user;
  } catch (error) {
    next(httpError(401, "Unauthorized"));
  }
  next();
};

module.exports = authorize;
