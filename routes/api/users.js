const express = require("express");
const usersRouter = express.Router();

const validationUser = require("../../middlewares/validationUsers");
const authorization = require("../../middlewares/authorization");

const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../сontrollers/usersСontrollers");

const controllerError = require("../../сontrollers/controllerError");

usersRouter.post("/signup", validationUser, controllerError(signupUser));

usersRouter.post("/login", validationUser, controllerError(loginUser));

usersRouter.post("/logout", authorization, controllerError(logoutUser));

usersRouter.get("/current", authorization, controllerError(currentUser));

module.exports = usersRouter;