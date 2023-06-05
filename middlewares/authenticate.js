const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  console.log("req.headers", req.headers);
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("token", token);
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
