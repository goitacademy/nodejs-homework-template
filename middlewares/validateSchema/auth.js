const jwt = require("jsonwebtoken");

const { User } = require("../../models/users");

const HttpError = require("../../helpers/HttpError.js");

async function auth(req, res, next) {
  const authHeaders = req.headers.authorization || "";

  const [type, token] = authHeaders.split(" ");
  if (type !== "Bearer" || !token) {
    throw new HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user) return next(new HttpError(404, "Not found"));

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw new HttpError(401, "JWT token is not valid");
    }
    throw error;
  }
  next();
}


module.exports = {auth};