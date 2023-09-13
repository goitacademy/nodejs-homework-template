const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  setUserAvatar,
} = require("../../controllers/authControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.use(authMiddleware);
router.get("/logout", logoutUser);
router.get("/current", getCurrentUser);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  setUserAvatar
);

module.exports = router;
