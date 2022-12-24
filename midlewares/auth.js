const { User } = require("../models/users");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new Unauthorized("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.messege === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
