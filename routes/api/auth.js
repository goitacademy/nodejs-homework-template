const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validation, autentificate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.register),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", autentificate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", autentificate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  autentificate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
