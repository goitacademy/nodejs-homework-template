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
usersRouter.get("/secret", authMiddleware, (req, res) =>
  res.status(200).send({ message: "Hello from secret area." })
);

module.exports = {
  usersRouter,
};
