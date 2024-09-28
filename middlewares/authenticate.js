const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../helpers/httpError");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, error.message("not Bearer"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, error.message("not user"));
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401);
  }
};

module.exports = authenticate;
