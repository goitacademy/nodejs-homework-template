const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
// router.post("/signup");

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
// router.post("/signin");

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
// router.get("/signout");

module.exports = router;
