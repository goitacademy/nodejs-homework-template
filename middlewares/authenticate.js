const { createError } = require("../helpers");

const UserModel = require("../models/authModel/UserModel");

const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");

    console.log(token);

    if (bearer !== "Bearer") {
      throw createError({ status: 401, message: "Unauthorized" });
    }

    const { id } = jwt.verify(token, JWT_SECRET_KEY);

    const user = await UserModel.findById(id);

    if (!user) {
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
