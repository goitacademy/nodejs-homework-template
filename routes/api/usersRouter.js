const express = require("express");
const router = new express.Router();

const { upload } = require("../middlewares/upload");
const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  userRegistration,
  userLogin,
  userGetCurrent,
  userLogOut,
  userSubscription,
  userDelete,
  userAvatar,
  userVerification,
  userSendSecondEmail,
} = require("../controllers/userController");

const {
  registrationValidator,
  loginValidator,
  subscriptionValidator,
  verificationValidator,
} = require("../middlewares/validation");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/signup", registrationValidator, asyncWrapper(userRegistration));
router.post("/login", loginValidator, asyncWrapper(userLogin));
router.get("/current", authMiddleware, asyncWrapper(userGetCurrent));
router.get("/logout", authMiddleware, asyncWrapper(userLogOut));
router.delete("/:userId", authMiddleware, asyncWrapper(userDelete));
router.patch(
  "/subscription",
  authMiddleware,
  subscriptionValidator,
  asyncWrapper(userSubscription)
);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  asyncWrapper(userAvatar)
);
router.get("/verify/:verificationToken", asyncWrapper(userVerification));
router.post(
  "/verify",
  verificationValidator,
  asyncWrapper(userSendSecondEmail)
);

module.exports = router;
