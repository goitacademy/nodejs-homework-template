const jwt = require("jsonwebtoken");
const { JWT_STRING } = process.env;
// const JWT_STRING = "2M6vwnlAxDyBdJBCJYYYv0q";
const User = require("../models/User");
const { newError } = require("../helpers");

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(newError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_STRING);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(newError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(newError(401, "Not authorized"));
  }
};

module.exports = checkToken;
