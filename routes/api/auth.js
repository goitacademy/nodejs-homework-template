const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, isAuth, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.authUser, "missing required fields"),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(schemas.authUser, "missing required fields"),
  ctrlWrapper(ctrl.login)
);

router.get("/current", isAuth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  isAuth,
  validation(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  isAuth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/logout", isAuth, ctrlWrapper(ctrl.logout));

module.exports = router;
