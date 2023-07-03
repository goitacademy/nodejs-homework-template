const express = require("express");

const { authControllers } = require("../../controllers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authControllers.register
);

router.get("/verify/:verificationCode", authControllers.verifyEmail);

router.post("/verify", authControllers.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), authControllers.login);

router.post("/logout", authenticate, authControllers.logout);

router.get("/current", authenticate, authControllers.getCurrent);

router.patch("/subscription", authenticate, authControllers.subscription);

module.exports = router;
