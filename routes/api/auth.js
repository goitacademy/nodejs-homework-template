const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { authenticate, upload, jimpResize } = require("../../middlewars");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(ctrl.register));

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verifyToken));

router.post("/verify", controllerWrapper(ctrl.resendEmail));

router.post("/login", controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  jimpResize,
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
