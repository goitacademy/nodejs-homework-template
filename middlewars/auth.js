const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env;

const throwUnauthorizedError = () => {
  throw RequestError(401, "Not authorized");
};

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = null] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throwUnauthorizedError();
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throwUnauthorizedError();
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
