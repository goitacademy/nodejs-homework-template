const express = require("express");
const ctrl = require("../../controllers/users");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { auth, upload } = require("../../middlewares");

router.post("/signup", ctrlWrapper(ctrl.register));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post("/verify/", ctrlWrapper(ctrl.resendVerify));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
