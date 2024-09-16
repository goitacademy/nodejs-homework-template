const express = require("express");
const usersRouter = express.Router();

const validationUser = require("../../middlewares/validationUsers");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/uploadAvatar");

const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  avatarUser,
} = require("../../сontrollers/usersСontrollers");

const controllerError = require("../../сontrollers/controllerError");

usersRouter.post("/signup", validationUser, controllerError(signupUser));

usersRouter.post("/login", validationUser, controllerError(loginUser));

usersRouter.post("/logout", authorization, controllerError(logoutUser));

usersRouter.get("/current", authorization, controllerError(currentUser));

usersRouter.patch("/avatars", authorization, upload.single("avatar"), controllerError(avatarUser));

module.exports = usersRouter;