const jwt = require("jsonwebtoken");
const dotevn = require("dotenv");
dotevn.config();

const { HttpError } = require("../helpers");
const { User } = require("../models/users");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new HttpError(401, "No authorization 1"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user) {
      next(new HttpError(401, "Token invalid"));
    }

    // write authenticated user
    req.user = user;
    console.log(req.user);

    next();
  } catch {
    next(new HttpError(401, "No authorization 2"));
  }
};

module.exports = authenticate;
