const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError } = require("../utils/errors");
const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new HttpError(401);
    }
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    req.user = user;
  } catch {
    next(new HttpError(401));
  }

  next();
};

module.exports = authenticate;
