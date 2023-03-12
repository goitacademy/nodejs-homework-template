const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { HttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (request, response, next) => {
  const { authorization = "" } = request.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    request.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;

