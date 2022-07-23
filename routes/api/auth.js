const express = require("express");
const {
  register,
  login,
  logout,
  currentUser,
  changeAvatar,
} = require("../../controllers/auth");
const { ctrlWrapper } = require("../../middlewares/middlewares");
const checkAuth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/signup", ctrlWrapper(register));
router.post("/login", ctrlWrapper(login));
router.get("/logout", checkAuth, ctrlWrapper(logout));
router.get("/current", checkAuth, ctrlWrapper(currentUser));
router.patch(
  "/avatars",
  checkAuth,
  upload.single("avatars"),
  ctrlWrapper(changeAvatar)
);
module.exports = router;
