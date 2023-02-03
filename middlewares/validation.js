const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");
const { HttpError } = require("../helpers/index");
const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message);
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return next(new HttpError("token type is not valid"));
  }

  if (!token) {
    return next(new HttpError("no token provided"));
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
      return next(new HttpError("jwt token is not valid"));
    }
    throw error;
  }

  next();
}

module.exports = {
  validateBody,
  auth,
};
