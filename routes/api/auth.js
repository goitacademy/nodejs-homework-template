const express = require("express");

const {
  signUp,
  logIn,
  logOut,
  currentUser,
} = require("../../controllers/auth");

const { authValidation } = require("../../middlewares/users/authValidation");
const { userValidation } = require("../../middlewares/users/userValidation");

const authRouter = express.Router();

authRouter.post("/signup", userValidation, signUp);

authRouter.post("/login", userValidation, logIn);

authRouter.get("/logout", authValidation, logOut);

authRouter.get("/current", authValidation, currentUser);

module.exports = authRouter;
