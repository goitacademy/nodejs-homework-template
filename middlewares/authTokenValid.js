const { HttpError } = require("../helpers");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../models/userShema");
const authTokenValid = async (req, res, next) => {
  const authHeaders = req.headers.authorization || "";
  const [type, token] = authHeaders.split(" ");
  if (type !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  if (!token) {
    throw HttpError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw HttpError(401, "Not authorized");
    }
  }
  next();
};

module.exports = authTokenValid;
