const express = require("express");
const {
  signupUserController,
  loginUserController,
  patchSubscriptionUserController,
  getCurrentUserController,
  logoutUserController,
  patchUserAvatarController,
  verifictaionUserController,
  repeatedVerifictaionUserController,
} = require("../../controllers/usersController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  loginValidation,
} = require("../../middlewares/validationLoginMiddlware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadAvatarMiddleware,
} = require("../../middlewares/uploadAvatarMiddleware");
const {
  repeatedVerifictaionUserValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/signup", loginValidation, asyncWrapper(signupUserController));

router.post("/login", loginValidation, asyncWrapper(loginUserController));

router.get("/logout", authMiddleware, asyncWrapper(logoutUserController));

router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));

router.patch(
  "/",
  authMiddleware,
  asyncWrapper(patchSubscriptionUserController)
);

router.get("/avatars/:avatarId", express.static("./public/avatars"));

router.post(
  "/verify/",
  repeatedVerifictaionUserValidation,
  asyncWrapper(repeatedVerifictaionUserController)
);

router.get("/verify/:verificationToken", verifictaionUserController);

router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  patchUserAvatarController
);

module.exports = router;
