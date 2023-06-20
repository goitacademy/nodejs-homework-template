const jwt = require("jsonwebtoken");
const {HttpError} = require("../helpers");
const {SECRET_KEY} = process.env;

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw HttpError(401, "Not authorized");
    }
    const token = authorization.split(" ")[1];
  
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      req.userId = id;
      next();
    } catch (err) {
      throw HttpError(401, "Not authorized");
    }
  };

  module.exports = authenticateToken;