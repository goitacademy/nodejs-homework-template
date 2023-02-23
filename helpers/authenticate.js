const { Unauthorized } = require("http-errors");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Oops, your token is rotten");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not in the db");
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Oops...token...."));
  }
};

module.exports = authenticate;
