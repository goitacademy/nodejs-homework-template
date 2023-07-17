const jwt = require("jsonwebtoken");
const dotevn = require("dotenv");
dotevn.config();

const { HttpError } = require("../helpers");
const { User } = require("../models/users");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(new HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, "Not authorized"));
    }

    // write authenticated user
    req.user = user;

    next();
  } catch {
    next(new HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
