const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { schemas } = require("../../service/schemasAuth");
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middleware");

router.post(
  "/register",
  schemas.userValidation,
  asyncWrapper(ctrl.registerUser)
);
router.post("/login", schemas.loginValidation, asyncWrapper(ctrl.loginUser));
router.get("/logout", authenticate, asyncWrapper(ctrl.logoutUser));
router.get("/current", authenticate, asyncWrapper(ctrl.getCurrentUser));

module.exports = router;
