const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { validation, auth, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(schemas.subscription),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatars)
);

module.exports = router;
