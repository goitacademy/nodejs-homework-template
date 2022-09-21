const jwt = require("jsonwebtoken");
const { AuthError } = require("../helpers");
const { users: operations } = require("../services");

const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");

    if (tokenType !== "Bearer") {
      next(new AuthError("Not authorized"));
    }

    if (!token) {
      next(new AuthError("Not authorized"));
    }

    const userData = jwt.verify(token, secret);
    const user = await operations.authUser(userData.id);

    if (user?.token !== token) {
      next(new AuthError("Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AuthError("Not authorized"));
  }
};

module.exports = auth;
