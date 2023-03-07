const jwt = require("jsonwebtoken");
const { User } = require("../models/");
const { RequestError } = require("../helpers");

const userAuthMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw RequestError(401);
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw RequestError(401, error.message);
  }
};

module.exports = userAuthMiddleware;
