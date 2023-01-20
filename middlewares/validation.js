const { BadRequest, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");
const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // throw new ValidationError(error.message);
      throw BadRequest(error.message);
    }
    return next();
  };
}

async function auth(req, res, next) {
  console.log("in auth...");
  // console.log("req.headers ", req.headers);

  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw Unauthorized("token type is not valid");
  }
  if (!token) {
    throw Unauthorized("no token provided");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    console.log("user: ", user);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw Unauthorized("jwt token is not valid");
    }
    throw error;
  }

  next();
}

module.exports = {
  validateBody,
  auth,
};
