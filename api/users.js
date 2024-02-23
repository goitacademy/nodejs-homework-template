const express = require("express");

const userController = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { uploadMiddleware } = require("../middlewares/upload");

const router = express.Router();

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);
router.patch("/:userId/subscription", auth, userController.updateSubscription);
router.patch(
  "/avatars",
  auth,
  uploadMiddleware.single("avatar"),
  userController.updateAvatar
);
router.delete("/", auth, userController.deleteUserByMail);

module.exports = router;
