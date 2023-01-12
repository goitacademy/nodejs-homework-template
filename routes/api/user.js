const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  userValidation,
  subscriptionValidation,
} = require("../../middleware/validationMiddlware");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  updateSubscriptionController,
} = require("../../controllers/userControllers");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post(
  "/users/register",
  userValidation,
  asyncWrapper(registerUserController)
);
router.get("/users/login", userValidation, asyncWrapper(loginUserController));
router.post(
  "/users/logout",
  authMiddleware,
  asyncWrapper(logoutUserController)
);
router.get(
  "/users/current",
  authMiddleware,
  asyncWrapper(currentUserController)
);
router.patch(
  "/users",
  authMiddleware,
  subscriptionValidation,
  asyncWrapper(updateSubscriptionController)
);

module.exports = router;
