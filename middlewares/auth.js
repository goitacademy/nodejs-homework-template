const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { auth = "" } = req.headers;
  const [bearer, token] = auth.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = auth;
