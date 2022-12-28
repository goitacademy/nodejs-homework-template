const express = require("express");
const { validation, ctrllWrapper } = require("../../middlewares");
const {
  users: { signup, login },
} = require("../../controllers");

const { signupUserSchema, loginUserSchema } = require("../../schemas");
const router = express.Router();

const userSignupValidation = validation(signupUserSchema);
const userLoginValidation = validation(loginUserSchema);

router.post("/signup", userSignupValidation, ctrllWrapper(signup));
router.post("/login", userLoginValidation, ctrllWrapper(login));

module.exports = router;
