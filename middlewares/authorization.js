const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils");
require("dotenv").config();

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Token is not exist"));
  }

  try {
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: id });
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authorization;
