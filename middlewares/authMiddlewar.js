const getError = require("../helpers/error");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authMiddlewar = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw getError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw getError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      throw getError(401, "Not authorized");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddlewar;
