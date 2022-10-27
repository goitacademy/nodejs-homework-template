const express = require("express");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  logOutUser,
  currentUser,
  updateSubscription,
  addUserAvatar,
} = require("../../models/users");
const {
  userValidation,
  userValidationSubscript,
} = require("../../middleware/validateMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  compressAvatarMiddleware,
} = require("../../middleware/compressAvatarMiddleware");
const { upload } = require("../../helpers/uploadAvatar");

router.post("/signup", userValidation, signUpUser);
router.post("/login", userValidation, loginUser);
router.post("/logout", authMiddleware, logOutUser);
router.post("/current", authMiddleware, currentUser);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  compressAvatarMiddleware,
  addUserAvatar
);
router.patch("/", authMiddleware, userValidationSubscript, updateSubscription);

module.exports = router;
