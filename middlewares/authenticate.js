const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");
const { User } = require("../models/user");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpError(401, "Not authorized");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new HttpError(401, "Not authorized");
    }

    try {
      const { userId } = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(userId);

      if (!user || !user.token || user.token !== token) {
        throw new HttpError(401, "Not authorized");
      }

      req.user = user;
      next();
    } catch (verificationError) {
      throw new HttpError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper(authenticate);
