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
usersRouter.post("/logout", authMiddleware, usersController.logoutHandler);
usersRouter.get("/current", authMiddleware, usersController.currentHandler);

usersRouter.patch(
  "/avatars",
  usersController.upload.single("avatar"),
  authMiddleware,
  usersController.avatarPatchHandler
);

module.exports = {
  usersRouter,
};
