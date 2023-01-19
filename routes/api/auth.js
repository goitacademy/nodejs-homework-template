const express = require("express");

const {
  validation,
  ctrlWrapper,
  authUser,
  upload,
} = require("../../middleware");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();
const { JoiRegisterShema, JoiLoginShema } = require("../../models/user");

router.post(
  "/signup",
  validation(JoiRegisterShema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(JoiLoginShema), ctrlWrapper(ctrl.login));

router.get("/current", authUser, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authUser, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authUser,
  upload.single("avatar"),
  ctrlWrapper(ctrl.createAvatar)
);

module.exports = router;
