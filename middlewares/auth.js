const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const { users: operations } = require("../services");

const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization?.split(" ");

    if (tokenType !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }

    if (!token) {
      throw RequestError(401, "Not authorized");
    }

    const userData = jwt.verify(token, secret);
    const user = await operations.authUser(userData.id);

    if (user?.token !== token) {
      throw RequestError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
