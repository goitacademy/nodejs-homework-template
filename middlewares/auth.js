const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (err) {
    if (
      err.message === "invalid signature" ||
      err.message === "invalid token"
    ) {
      err.status = 401;
    }
    next(err);
  }
};
module.exports = auth;
