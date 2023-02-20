const jwt = require('jsonwebtoken')

const requestError = require('../helpers/requestError')

const { User } = require('../models/user')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(' ')
    console.log(bearer)
    console.log(token)
    if (bearer !== 'Bearer') {
      throw requestError(401)
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token || user.token !== token) {
      throw requestError(401)
    }
    req.user = user
    next()
  } catch (error) {
    if (!error.status) {
      error.status = 401
      error.message = 'Unauthorized'
    }
    next(error)
  }
}

module.exports = authenticate

// 23:49
// 39:54
// const jwt = require("jsonwebtoken");

// const { RequestError } = require("../helpers");

// const { User } = require("../models/user");

// const { SECRET_KEY } = process.env;

// const authenticate = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     const [bearer, token] = authorization.split(" ");
//     if (bearer !== "Bearer") {
//       throw RequestError(401);
//     }
//     const { id } = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(id);
//     if (!user || !user.token || user.token !== token) {
//       throw RequestError(401);
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     if (!error.status) {
//       error.status = 401;
//       error.message = "Unauthorized";
//     }
//     next(error);
//   }
// };

// module.exports = authenticate;
