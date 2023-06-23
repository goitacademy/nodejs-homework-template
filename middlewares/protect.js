const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const { User } = require("../models");
const { HttpError, wrapper } = require("../helpers");

const protect = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    throw HttpError(401, "Not authorized");
  }

  let decoded = "";

  try {
    decoded = jwt.verify(token, JWT_KEY);
    
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser || currentUser.token !== token) {
    throw HttpError(401, "Not authorized");
  }

  req.user = currentUser;

  next();
};

module.exports = wrapper(protect);
