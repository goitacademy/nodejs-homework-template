const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../models/user.model");
const { NotAuthorizedError } = require("../helpers/errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");

  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(verifiedToken._id);
      req.user = user;
      return next();
    } catch (error) {
      throw new NotAuthorizedError("Not authorized");
    }
  }
  throw new NotAuthorizedError("No token");
};

module.exports = {
  auth,
};
