const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { handleHttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(handleHttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(handleHttpError(401, "token user`s is invalid!"));
    }
    req.user = user;
    next();
  } catch {
    next(handleHttpError(401));
  }
};

module.exports = authenticate;
