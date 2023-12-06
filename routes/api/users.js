const { Router } = require("express");

const ctrl = require("../../controllers/users");
const {
  registerSchema,
  loginSchema,
  updateUserSubscription,
} = require("../../validations/usersSchemas");
const { isValidBody, authenticate } = require("../../middlewares");

const router = Router();

router.post("/register", isValidBody(registerSchema), ctrl.register);
router.post("/login", isValidBody(loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.current);
router.patch(
  "/current/subscription",
  authenticate,
  isValidBody(updateUserSubscription),
  ctrl.updateSubscription
);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
