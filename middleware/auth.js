const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createAuthError } = require("../helpers/errorHelpers");
const { SECRET_KEY } = require("../config");

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [tokenType, token] = authorization.split(" ");

    if (!token || tokenType !== "Bearer") {
      return next(createAuthError());
    }

    const { userId } = jwt.verify(token, SECRET_KEY);
    if (!userId) {
      return next(createAuthError());
    }

    const user = await User.findById(userId, { password: 0 });
    if (!user || !user.token) {
      return next(createAuthError());
    }
    req.user = user;

    next();
  } catch (err) {
    next(createAuthError(err.message));
  }
};

module.exports = auth;
