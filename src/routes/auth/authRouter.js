const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentController,
} = require("../../controllers/auth");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody, authMiddleware } = require("../../middlewares");
const { registerSchema } = require("../../schemas/auth/registerSchema");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  tryCatchWrapper(registerController)
);
router.post(
  "/login",
  validateBody(registerSchema),
  tryCatchWrapper(loginController)
);

router.post("/logout", authMiddleware(), tryCatchWrapper(logoutController));

router.post("/current", authMiddleware(), tryCatchWrapper(currentController));

module.exports = { authRouter: router };
