const express = require("express");
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const {
  newUserSchema,
  updateSubscriptionSchema,
} = require("../../schemas/users-schemas");
const authenticate = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users-controllers");

router.post(
  "/register",
  validateBody(newUserSchema),
  register
);
router.post("/login", validateBody(newUserSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/",
  validateBody(updateSubscriptionSchema),
  authenticate,
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
