const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  patchSubscriptionValidation,
} = require("../../middlewares/validationMiddleware");
const { avatarMiddleware } = require("../../middlewares/avatarMiddleware");

const { avatarController } = require("../../controllers/avatarController");
const {
  getUserController,
  updateSubscriptionController,
} = require("../../controllers/users");

router.get("/current", authMiddleware, asyncWrapper(getUserController));
router.patch(
  "/avatars",
  authMiddleware,
  avatarMiddleware.single("avatar"),
  asyncWrapper(avatarController)
);
router.patch(
  "/",
  authMiddleware,
  patchSubscriptionValidation,
  asyncWrapper(updateSubscriptionController)
);

module.exports = router;
