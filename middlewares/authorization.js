const token = require("../utils");
const Errors = require("http-errors");

const authorization = () => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      try {
        throw new Errors.Unauthorized("not authorization");
      } catch (error) {
        next(error);
      }
    }
    const [bearer, userToken] = req?.headers?.authorization.split(" ");
    if (!bearer && !userToken) {
      try {
        throw new Errors.Unauthorized("not authorization");
      } catch (error) {
        next(error);
      }
    }
    try {
      token.verify(userToken);
    } catch (error) {
      next(error);
    }
    next();
  };
};

module.exports = authorization;
