const express = require("express");
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const {
  newUserSchema,
  updateSubscriptionSchema,
} = require("../../schemas/users-schemas");
const authenticate = require("../../middlewares/auth");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/users-controllers");

router.post("/register", validateBody(newUserSchema), register);
router.post("/login", validateBody(newUserSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/",
  validateBody(updateSubscriptionSchema),
  authenticate,
  updateSubscription
);

module.exports = router;
