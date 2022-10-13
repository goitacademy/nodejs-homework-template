const { User } = require("../models")
const jwt = require("jsonwebtoken")
const {RequestError} = require("../helpers")
require("dotenv").config()
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized")
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw Error("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, "Not authorized")
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;