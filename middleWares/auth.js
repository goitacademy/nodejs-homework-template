const { httpError } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw httpError(401, "token type is not valid");
  }
  if (!token) {
    throw httpError(401, "no token provided");
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw httpError(401, "jwt token is not valid");
    }
    throw error;
  }

  next();
}

module.exports = { auth };
