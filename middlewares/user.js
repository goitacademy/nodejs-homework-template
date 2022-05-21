const jsonwebtoken = require("jsonwebtoken");
const { createError } = require("../helpers");

const {User } = require('../models/user');

const { SECRET_KEY } = process.env;

const  user = async (req, res, next) => {
  try {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    try {
      const { id } = jsonwebtoken.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if(!user || !user.token) {
          throw createError(401)
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = user;
