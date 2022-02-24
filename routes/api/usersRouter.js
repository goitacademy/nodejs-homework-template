const express = require("express");
const userValidation = require("../../middlewares/userValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { tokenMiddleware } = require("../../middlewares/tokenMiddleware");

const {
  singupController,
  loginController,
  logoutController,
  currentUserController,
  patchUserController,
} = require("../../controllers/usersController");

const usersRouter = express.Router();

usersRouter.post("/signup", userValidation, asyncWrapper(singupController));
usersRouter.post("/login", userValidation, asyncWrapper(loginController));
usersRouter.get("/logout", tokenMiddleware, asyncWrapper(logoutController));
usersRouter.get(
  "/current",
  tokenMiddleware,
  asyncWrapper(currentUserController)
);
usersRouter.patch("/", tokenMiddleware, asyncWrapper(patchUserController));

module.exports = usersRouter;
