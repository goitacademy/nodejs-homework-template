const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { HttpError } = require("../helpers");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  if (!token) {
    throw HttpError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "Not authorized");
    }
  }

  next();
};

module.exports = auth;
