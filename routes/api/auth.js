const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { validationBody } = require("../../middlewares/validation");

const { schemas } = require("../../models/user");

router.post(
  "/register",
  validationBody(schemas.register),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validationBody(schemas.login), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/subscription",
  auth,
  validationBody(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;