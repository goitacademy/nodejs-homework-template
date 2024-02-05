const express = require("express");

const AuthController = require("../controllers/auth");

const authMiddleware = require("../middleware/auth");

const uploadMiddleware = require("../middleware/upload");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.get("/current", authMiddleware, AuthController.current);

router.patch("/", authMiddleware, AuthController.updateSubscription);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  AuthController.updateAvatar
);

router.get("/verify/:token", AuthController.verify);
router.post("/verify", AuthController.resendVerify);

module.exports = router;
