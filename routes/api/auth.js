const express = require("express");

const authController = require("../../controllers/authControllers");

const schemas = require("../../schemas/users");

const router = express.Router();

const { validateBody } = require("../../decorators");

const { authenticate } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

router.post(
  "/login",
  validateBody(schemas.userRegisterSchema),
  authController.signin
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

module.exports = router;
