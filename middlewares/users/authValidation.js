const jwt = require("jsonwebtoken");

const { HttpError } = require("../../helpers");
const { User } = require("../../models/modelUser");

async function authValidation(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw HttpError(401, "token type is not valid");
  }

  if (!token) {
    throw HttpError(401, "no token provided");
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "jwt token is not valid");
    }

    throw error;
  }

  next();
}

module.exports = {
  authValidation,
};
