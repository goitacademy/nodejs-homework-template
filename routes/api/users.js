const express = require("express");
const { schemas } = require("../../service/schemasUsers");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { users: ctrl } = require("../../controllers");

router.post(
  "/register",
  //   schemas.userValidation,
  asyncWrapper(ctrl.registerUser)
);
// router.get("/login", asyncWrapper());
// router.get("/logout", asyncWrapper());
// router.get("/current", asyncWrapper());

module.exports = router;
