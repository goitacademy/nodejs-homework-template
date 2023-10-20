const { Router } = require("express");
const usersController = require("./users.controller");
const { userValidatorMiddleware } = require("./users.validators");
const { authMiddleware } = require("../auth/auth.middleware");

const usersRouter = Router();

usersRouter.post(
  "/signup",
  userValidatorMiddleware,
  usersController.signupHandler
);

usersRouter.post(
  "/login",
  userValidatorMiddleware,
  usersController.loginHandler
);

usersRouter.get("/secret", authMiddleware, usersController.secretHandler);

usersRouter.post("/logout", authMiddleware, usersController.logoutHandler);

usersRouter.get("/current", authMiddleware, usersController.currentHandler);

module.exports = {
  usersRouter,
};
