const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
  isValidId,
} = require("../../middlewares");
const { auth } = require("../../controllers");
const { signupJoiSchema, loginJoiSchema } = require("../../models/user");
const router = express.Router();

router.post(
  "/signup",
  validationConstructor(signupJoiSchema),
  controllerWrapper(auth.signup)
);
router.post(
  "/login",
  validationConstructor(loginJoiSchema),
  controllerWrapper(auth.login)
);
module.exports = router;
