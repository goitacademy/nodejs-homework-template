const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const { Users } = require("../models/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (!token || bearer !== "Bearer") {
    next(new NotAuthorizedError("Not authorized"));
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const candidate = await Users.findById(_id);
    if (!candidate) {
      next(new NotAuthorizedError("Not authorized"));
    }
    req.user = candidate;
    req.user.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = auth;
