const { CustomError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new CustomError(400, error.message));
    }
    return next();
  };
}
async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return next(new CustomError(401, "Token type is not valid"));
  }
  if (!token) {
    return next(new CustomError(401, "No token provided"));
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
      return next(new CustomError(401, "Not authorized"));
    }
    throw error;
  }

  next();
}
module.exports = {
  validateBody,
  auth,
};
