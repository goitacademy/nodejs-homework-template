const express = require("express");
const {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
  updateAvatar,
} = require("../../controllers");
const { ctrlWrapper, validateBody } = require("../../helpers");
const { userAuth, upload } = require("../../middlewares");
const { authSchema } = require("../../models");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrlWrapper(register));

router.post("/login", validateBody(authSchema), ctrlWrapper(login));

router.get("/current", userAuth, ctrlWrapper(getCurrentUser));

router.get("/logout", userAuth, ctrlWrapper(logout));

router.patch("/:id/subscription", userAuth, ctrlWrapper(updateUserStatus));

router.patch(
  "/avatars",
  userAuth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
