const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { findUserById } = require("../services/users");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("authorisation", authorization);
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized Bearer");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUserById(id);
    if (!user) {
      throw new Unauthorized("Not authorized User");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
