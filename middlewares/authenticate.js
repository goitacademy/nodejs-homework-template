const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { SEKRET_KEY } = process.env;

  if (!token) {
    next(HttpError(401));
  }

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SEKRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
