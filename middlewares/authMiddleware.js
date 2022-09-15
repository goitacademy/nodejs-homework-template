const jwt = require("jsonwebtoken");
const { AuthError } = require("../helpers");
const { authUser } = require("../services");

const secret = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    if (!token) {
      throw new AuthError("Not authorized");
    }

    const userData = jwt.verify(token, secret);
    const user = await authUser(userData.id);

    if (user.token !== token) {
      throw new AuthError("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AuthError("Invalid token"));
  }
};

module.exports = { authMiddleware };
