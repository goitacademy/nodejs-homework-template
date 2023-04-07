const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const {
  upload,
  uploadMiddleware,
} = require("../../middlewares/upload/uploadMiddleware");

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const {
  joiUserSubscriptionSchema,
  joiUserReVerefySchema,
} = require("../../models/userModel");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  currentUserController,
  subscriptionUserController,
  changeUserAvatarController,
  reVerificationController,
} = require("../../controllers/usersController");

router.post("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/subscription",
  authMiddleware,
  validation(joiUserSubscriptionSchema),
  asyncWrapper(subscriptionUserController)
);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  uploadMiddleware,
  asyncWrapper(changeUserAvatarController)
);
router.post(
  "/verify",
  validation(joiUserReVerefySchema),
  asyncWrapper(reVerificationController)
);

module.exports = {
  usersRouter: router,
};
