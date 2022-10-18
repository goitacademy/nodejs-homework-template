const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { requestError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(requestError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("this is verified", jwt.verify(token, SECRET_KEY));
    const user = await User.findById(id);
    if (!user) {
      next(requestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(requestError(401, "Not authorized"));
  }
};
module.exports = authenticate;
