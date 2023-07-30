const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const { JWT_SECRET } = process.env;

const { HttpError } = require("../helpers");

const ctrlWrapper = require("../decorators");

const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) throw HttpError(401, "Not authorized");

    next();
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};


module.exports = ctrlWrapper(authenticate);
