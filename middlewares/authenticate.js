const jwt = require("jsonwebtoken");

const { createError } = require("../helpers");
const User = require("../models/users");

const { JWT_SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError({ status: 401, message: "Unauthorized" });
    }

    const { id } = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw createError({ status: 401, message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
}

module.exports = authenticate;
