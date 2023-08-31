const { HttpError } = require("../helpers");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "unvalidated bearer"));
  }

  try {
    const jwtw = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(jwtw.id);

    if (!user) {
      next(HttpError(401, "user not found"));
    }
    next();
  } catch {
    next(HttpError(401, "unvalidated token"));
  }
};

module.exports = authenticate;
