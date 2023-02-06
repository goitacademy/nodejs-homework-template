const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../service/schemas/users');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
        return next(createError(401, "Not authorized"));
      }

    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({_id: id});

    if (!user) {
        return next(createError(401, "Not authorized"));
      }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
        error.status = 401;
    }
    next(error);
  }
};

module.exports = {
    auth
};