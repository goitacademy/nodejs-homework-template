const jwt = require("jsonwebtoken");

const { User } = require("../models/users");

const { RequestError } = require("../helpers/RequestError");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(RequestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = { authenticate };
