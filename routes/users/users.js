const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  onlyStarter,
  onlyPro,
  onlyBusiness,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");

const {
  validateCreateUser,
  validateLogin,
  validateSubscriptionUpdate,
  validateResendingEmail,
} = require("./validation");


const guard = require("../../helpers/guard");
const { Subscription } = require("../../config/constants");
const role = require("../../helpers/role");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const wrapError = require("../../helpers/errorHandler");

const STARTER = Subscription.STARTER;
const PRO = Subscription.PRO;
const BUSINESS = Subscription.BUSINESS;

router.patch(
  "/subscription",
  guard,
  validateSubscriptionUpdate,
  updateSubscription
);

router.get("/starter", guard, role(STARTER), wrapError(onlyStarter));

router.get("/pro", guard, role(PRO), wrapError(onlyPro));

router.get("/business", guard, role(BUSINESS), wrapError(onlyBusiness));

router.post("/signup", validateCreateUser, signup);
router.post("/login", validateLogin, loginLimit, login);
router.post("/logout", guard, logout);
router.get("/current", guard, currentUser);

router.patch("/avatars", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:verifyToken", wrapError(verifyUser));
router.post("/verify", validateResendingEmail, repeatEmailForVerifyUser);

module.exports = router;