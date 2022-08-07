const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  patchSubscriptionValidation,
} = require("../../middlewares/validationMiddleware");

const {
  getUserController,
  updateSubscriptionController,
} = require("../../controllers/users");

router.get("/current", authMiddleware, asyncWrapper(getUserController));

router.patch(
  "/",
  authMiddleware,
  patchSubscriptionValidation,
  asyncWrapper(updateSubscriptionController)
);

module.exports = router;
