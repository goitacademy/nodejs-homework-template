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
const { upload } = require("../../helpers/uploadAvatar");

router.post("/signup", userValidation, signUpUser);
router.post("/login", userValidation, loginUser);
router.post("/logout", authMiddleware, logOutUser);
router.post("/current", authMiddleware, currentUser);
router.patch("/", authMiddleware, userValidationSubscript, updateSubscription);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  addUserAvatar
);

module.exports = router;
