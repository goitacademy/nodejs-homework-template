const jwt = require("jsonwebtoken");
const { User } = require("../../models/userSchema");
const { createError } = require("../../helpers");
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
