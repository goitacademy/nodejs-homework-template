const express = require("express");
const router = express.Router();
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");

router.post(
  "/register",
  validation(registerJoiSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout))

module.exports = router;
