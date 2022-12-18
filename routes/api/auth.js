const express = require("express");

const router = express.Router();

const auth = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { controllerWrapper } = require("../../helpers");

const { registerUserSchema, loginUserSchema } = require("../../schemas");

router.post(
  "/register",
  validateBody(registerUserSchema),
  controllerWrapper(auth.registerUser)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(auth.login)
);

module.exports = router;
