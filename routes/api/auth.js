const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemasUser } = require("../../models");
const controllers = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  controllers.registerUser
);

router.post(
  "/login",
  validateBody(schemasUser.loginSchema),
  controllers.loginUser
);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post(
  "/logout",
  authenticate,
  validateBody(schemasUser.loginSchema),
  controllers.logoutUser
);

module.exports = router;
