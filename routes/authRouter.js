const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authValidation } = require("../middlewears/userValidation");
const { authMiddleware } = require("../middlewears/authMiddleware");
const {
  uploadAvatarMiddleware,
} = require("../middlewears/uploadAvatarMiddleware");
const { patchUserAvatarController } = require("../contrillers/authController");
const router = express.Router();

const {
  registrationController,
  loginController,
  logoutUserController,
  getCurrentUserController,
} = require("/nodejs-homework-template-vm/contrillers/authController");

router.post("/singup", authValidation, asyncWrapper(registrationController));
router.post("/login", authValidation, asyncWrapper(loginController));
router.get("/logout", authMiddleware, asyncWrapper(logoutUserController));
router.get("/avatars/:avatarId", express.static("./public/avatars"));
router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));
router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  patchUserAvatarController
);

module.exports = { authRouter: router };
