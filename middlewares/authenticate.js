const { HttpError } = require("../Helpers");
const { JWT_SECRET } = process.env;
const { usersModel } = require("../models/users");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "unauthorized 1"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await usersModel.findById(id);
    // console.log("user", user);
    // console.log("user-token", user.token);
    // console.log("token", token);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "unauthorized 2"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authenticate;
