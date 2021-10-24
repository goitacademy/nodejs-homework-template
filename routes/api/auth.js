const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth/users");

const { validateAuth } = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");

const upload = require("../../middlewares/upload");

router.post("/register", validateAuth, authController.register);
router.post("/login", validateAuth, authController.login);
router.get("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.currentUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = router;
