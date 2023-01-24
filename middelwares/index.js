const { HttpError } = require("../helpers/index");
const { JWT_SECRET } = process.env;
const { User } = require("../db/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
}

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw HttpError(401, "token type is not valid");
    }

    if (!token) {
      throw HttpError(401, "no token provided");
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.message.includes("Unexpected token")
    ) {
      return next(HttpError(401, "Not authorized"));
    }
    return next(error);
  }

  return next();
};

const checkChangeSubscription = (req, res, next) => {
  const { subscription } = req.body;

  if (
    !subscription ||
    (subscription !== "starter" &&
      subscription !== "pro" &&
      subscription !== "business")
  ) {
    return next(
      HttpError(
        400,
        "Subscription must be one of the following values: 'starter', 'pro', 'business'!!!"
      )
    );
  }

  return next();
};

module.exports = {
  validateBody,
  auth,
  checkChangeSubscription,
};
