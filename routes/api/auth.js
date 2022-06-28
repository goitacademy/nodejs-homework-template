const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, isAuth } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.authUser),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.authUser), ctrlWrapper(ctrl.login));

router.get("/current", isAuth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  isAuth,
  validation(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

router.get("/logout", isAuth, ctrlWrapper(ctrl.logout));

module.exports = router;
