const express = require("express");
const { validation, ctrllWrapper } = require("../../middlewares");
const {
  users: { signup },
} = require("../../controllers");

const { signupUserSchema, loginUserSchema } = require("../../schemas");
const router = express.Router();

const userSignupValidation = validation(signupUserSchema);
const loginUserValidation = validation(loginUserSchema);

router.post("/signup", userSignupValidation, ctrllWrapper(signup));

module.exports = router;
