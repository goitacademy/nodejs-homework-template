const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");
const User = require("../service/schema/userSchema");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const [, token] = authHeader.split(" ");
      if (!token) {
        next(new NotAutorizedError("Not authorized"));
      }

      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.token = token;
      req.user = user;

      const userCheck = await User.findOne({ _id: user.id ,token});
      if (!userCheck) {
        next(new NotAutorizedError("Not authorized"));
      } 
      next();
    } catch (err) {
      next(new NotAutorizedError("Not authorized"));
    }
  } else {
    next(new NotAutorizedError("Missing authoriaztion field"));
  }
};

module.exports = { authMiddleware };
