const express = require("express");
const router = express.Router();
const { auth } = require("../../controllers");
const { joiUserSchema } = require("../../model");
const {
  validation,
  expressCtrlWrapper,
  authenticate,
} = require("../../validation");

router.post(
  "/register",
  validation(joiUserSchema),
  expressCtrlWrapper(auth.register)
);
router.post(
  "/login",
  validation(joiUserSchema),
  expressCtrlWrapper(auth.login)
);
router.get(
  "/logout",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(auth.logout)
);
router.get(
  "/current",
  expressCtrlWrapper(authenticate),
  expressCtrlWrapper(auth.currentUser)
);

module.exports = router;
