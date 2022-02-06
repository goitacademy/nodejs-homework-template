const express = require("express");

const { ctrlWrapper, authenticate, validation } = require("../../midlewares");
const ctrl = require("../../controllers/users");
const { signupJoiSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(signupJoiSchema),
  ctrlWrapper(ctrl.signupUser)
);

router.post("/login", validation(signupJoiSchema), ctrlWrapper(ctrl.loginUser));

router.get("/current", authenticate, ctrlWrapper(ctrl.currentUser));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));

module.exports = router;
