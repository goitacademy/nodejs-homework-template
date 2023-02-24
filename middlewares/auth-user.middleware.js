const { createHttpException } = require("../helpers");
const { UserModel } = require("../models");
const { verifyToken } = require("../services/jwt");

const authUser = async (req, res, next) => {
  try {
    const unauthorizedMessage = "Authentication failed";
    const { authorization } = req.headers;

    if (!authorization) {
      throw createHttpException(401, unauthorizedMessage);
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createHttpException(401, unauthorizedMessage);
    }

    try {
      const { userId } = verifyToken(token);
      const userInstance = await UserModel.findById(userId);
      if (!userInstance) {
        throw createHttpException(401, unauthorizedMessage);
      }

      req.user = userInstance;

      next();
    } catch (error) {
      throw createHttpException(401, unauthorizedMessage);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
