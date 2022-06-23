const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

// router.post(
//   "/register",
//   validation(joiRegisterSchema),
//   ctrlWrapper(ctrl.register)
// );
router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/signin", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
// "/login"
module.exports = router;
