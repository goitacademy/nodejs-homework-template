const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middelwares");
const { users: ctrl } = require("../../controllers");
const { RegisterJoiSchema, LoginJoiSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(RegisterJoiSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(LoginJoiSchema), ctrlWrapper(ctrl.login));

router.get("./current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
