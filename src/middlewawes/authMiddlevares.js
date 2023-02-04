const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const createError = require("../helpers/createError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  //   const { authorization = "" } = req.headers;
  //   const [bearer, token] = authorization.split(" ");
  const [bearer, token] = req.headers.authorization?.split(" ") ?? [];
  try {
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !token) {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
