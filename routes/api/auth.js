const express = require("express");

const router = express.Router();

const auth = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { controllerWrapper } = require("../../helpers");

const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../../schemas");

router.post(
  "/register",
  validateBody(registerUserSchema),
  controllerWrapper(auth.registerUser)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(auth.loginUser)
);

router.post(
  "/updatePassword/:userId",
  validateBody(updateUserSchema),
  controllerWrapper(auth.updateUserPassword)
);

module.exports = router;
