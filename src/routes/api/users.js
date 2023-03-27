const express = require("express");
const { auth, upload } = require("../../../src/middlewares");

const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionCtrl,
  AvatarCtrl,
} = require("../../controllers");

router.post("/register", controllerWrapper(registrationCtrl));
router.post("/login", controllerWrapper(loginCtrl));
router.get("/logout", auth, controllerWrapper(logoutCtrl));
router.get("/current", auth, controllerWrapper(currentUserCtrl));
router.patch("/subscription", auth, controllerWrapper(subscriptionCtrl));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(AvatarCtrl)
);

module.exports = router;
