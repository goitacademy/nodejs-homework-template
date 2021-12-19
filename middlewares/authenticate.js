const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../model");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new NotFound();
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized(error.message));
  }
};

module.exports = authenticate;
