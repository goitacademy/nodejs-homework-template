const express = require("express");

const authController = require("../../controllers");

const schemas = require("../../schemas/users");

const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

// signup/register можливі назви для реєстрації user
router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

// signin/login можливі назви для логування user
router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authController.signin
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.userUpdateSubscriptionShema),
  authController.updateSubscription
);

module.exports = router;
