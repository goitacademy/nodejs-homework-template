const jwt = require("jsonwebtoken");
const User = require("../models/users");
const HttpError = require("../error/error.js");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError(401, "Not authorized");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw new HttpError(401, "Not authorized");
    }

    try {
      const user = await User.findById(decode.id);

      if (!user || user.token !== token) {
        throw new HttpError(401, "Not authorized");
      }

      req.user = decode;
      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      throw new HttpError(500, "Internal Server Error");
    }
  });
}

module.exports = auth;
