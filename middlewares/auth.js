const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../service/schemas/user/users");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw RequestError(401, "Token type is not valid");
  }
  if (!token) {
    throw RequestError(401, "No token provided");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw RequestError(401, "User not found");
    }
    if (token === user.token) {
      req.user = user;
    } else {
      throw RequestError(401, "Token mismatch");
    }
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw RequestError(401, "JWT token is not valid");
    }
    throw error;
  }
  next();
};
module.exports = auth;
