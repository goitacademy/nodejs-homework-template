const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

async function auth(req, res, next) {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "jwt expired" ||
      error.message === "invalid token" ||
      error.message === "jwt malformed"
    ) {
      error.status = 401;
    }
    next(error);
  }
}

module.exports = auth;
