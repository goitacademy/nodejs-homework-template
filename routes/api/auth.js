const express = require("express");
const { schemas } = require("../../service/schemasAuth");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");

router.post(
  "/register",
  schemas.userValidation,
  asyncWrapper(ctrl.registerUser)
);
// router.get("/login", asyncWrapper());
// router.get("/logout", asyncWrapper());
// router.get("/current", asyncWrapper());

module.exports = router;
