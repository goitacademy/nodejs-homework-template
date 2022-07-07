const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");
const { User } = require("../models/user");

/*
1. get autorization from query of headers
2. divide him into two words
3. check is equal firs word to "Bearer"
3.1. if not - send res code 401
4. check is token valid
4.1. if not - send res code 401
5. if token valid, check DB for user with id from payload
5.1. if not - send res code 401
6. add the user we find to the request object
req.user = user
7. next()
*/

const { SECRET_KEY } = process.env;

const isAuthorized = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthorized;
