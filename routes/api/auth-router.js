const express = require("express");

const authRouter = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");
const authenticate = require("../../middlewares/authenticate");

const {
  signup,
  login,
  getCurrentUser,
  logoutUser,
} = require("../../controllers/authControllers");

const { useValidationEmail } = require("../../auth/useValidationEmail");

authRouter.post("/register", useValidationEmail, isEmptyBody, signup);

authRouter.post("/login", isEmptyBody, login);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutUser);

module.exports = authRouter;
