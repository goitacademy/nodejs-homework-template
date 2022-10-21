const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");

const SECRET_KEY = "1sa3fdj63op99";

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

      if (!user || token !== user.token) {
        throw new Error("error");
      }

      req.user = user;

      next();
    } catch (error) {
      throw RequestError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
