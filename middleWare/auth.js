const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {SECRET} = require("../config");
require("dotenv").config();

const checkToken = async (req, res, next) => {
  try {
    const {authorization = 0} = req.headers;
    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || token === "") {
      next(new Unauthorized("Not authorized!!!"));
    }
    const {id} = jwt.verify(token, SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(new Unauthorized("Not authorized!!!!"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Not authorized!!!!!"));
  }
};

module.exports = {
  checkToken,
};
