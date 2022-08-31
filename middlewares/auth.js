const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { createError } = require("../helpers");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || user.token !== token) {
        throw createError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};
