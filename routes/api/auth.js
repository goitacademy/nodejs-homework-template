const express = require("express");
const { validation } = require("../../middlewares");
const { errorHandler } = require("../../helpers");
const { userSignupSchema } = require("../../schemas"); // TODO:  add userLoginSchema
const { signupUserController } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(userSignupSchema),
  errorHandler(signupUserController)
);

module.exports = router;
