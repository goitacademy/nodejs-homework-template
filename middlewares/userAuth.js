const { User } = require("../models");
const { encryptedKey } = require("../controllers/users");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" && !token) {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, encryptedKey.encryptedKey);
    const user = await User.findById(id);
    if (!user || !user.token === null) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = userAuth;
