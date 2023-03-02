const express = require("express");
const router = express.Router();

const {
  authenticate,
  validation,
  ctrlWrapper,
} = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const {
  joiRegisterSchema,
  joiLoginSchema,
} = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  ctrlWrapper(ctrl.login)
);
router.get(
  "/current",
  authenticate,
  ctrlWrapper(ctrl.getCurrent)
);

router.post(
  "/logout",
  authenticate,
  ctrlWrapper(ctrl.logout)
);

module.exports = router;
