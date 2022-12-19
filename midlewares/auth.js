const { User } = require("../models/users");
const { Unauthorized } = require("http-errors");
// const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, "dfherehdh4tsdgd4");
    const user = await User.findById(id);
    if (!user) {
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
