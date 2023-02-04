const express = require("express");
const { validation } = require("../../middlewares");
const { errorHandler } = require("../../helpers");
const { userSignupSchema, userLoginSchema } = require("../../schemas");
const {
  signupUserController,
  loginUserController,
} = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(userSignupSchema),
  errorHandler(signupUserController)
);

router.post(
  "/login",
  validation(userLoginSchema),
  errorHandler(loginUserController)
);

module.exports = router;
