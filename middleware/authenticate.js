const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorize"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const existUser = await User.findById(id);
    if (!existUser || !existUser.token || existUser.token !== token) {
      next(HttpError(401, "Not authorize"));
    }
    req.user = existUser;

    next();
  } catch {
    next(HttpError(401, "Not authorize"));
  }
};

module.exports = { authenticate };