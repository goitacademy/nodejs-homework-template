const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const userTokenMiddleware = require("../../middlewares/userToken");
const authenticate = require("../../middlewares/authentificate");
const uploadAvatar = require("../../middlewares/uploadAvatar");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userTokenMiddleware, userController.logoutUser);
router.get("/current", userTokenMiddleware, userController.getCurrentUser);
router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  userController.updateAvatar
);
router.get("/verify/:verificationToken", userController.verificationToken);
router.post("/verify", userController.resendVerificationEmail);

module.exports = router;
