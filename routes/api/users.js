const express = require("express");

const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
