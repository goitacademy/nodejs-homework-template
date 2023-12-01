const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError } = require("../helpers");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SEACRET);
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

module.exports = auth;
