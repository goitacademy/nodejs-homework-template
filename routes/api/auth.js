const express = require("express");

const {
  signUp,
  logIn,
  logOut,
  currentUser,
  uploadController,
} = require("../../controllers/auth");

const { authValidation } = require("../../middlewares/users/authValidation");
const { userValidation } = require("../../middlewares/users/userValidation");
const {
  avatarMiddleware,
} = require("../../middlewares/users/avatarMiddleware");

const authRouter = express.Router();

authRouter.post("/signup", userValidation, signUp);

authRouter.post("/login", userValidation, logIn);

authRouter.get("/logout", authValidation, logOut);

authRouter.get("/current", authValidation, currentUser);

authRouter.patch(
  "/avatars",
  authValidation,
  avatarMiddleware.single("avatar"),

  uploadController
);

module.exports = authRouter;
