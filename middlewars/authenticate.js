const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const RequestError = require("../helpers/RequestError");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw RequestError(401);
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authenticate;
