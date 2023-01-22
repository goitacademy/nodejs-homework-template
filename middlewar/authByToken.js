const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");

const authByToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw next(Unauthorized("Token type is invalid"));
    }

    if (!token) {
      throw next(Unauthorized("No token provided"));
    }

    try {
      const { id } = jwt.verify(token, process.env.JWT_CODE);
      const user = await Auth.findById(id);

      req.user = user;
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        throw next(Unauthorized("No token provided"));
      }
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authByToken };
