const router = require("express").Router();
const {
  bodyValidator,
  authenticate,
  updateFavoriteStatus,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const {
  registerUser,
  userLogin,
  getCurrent,
  logoutUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerify,
} = require("../../controllers/auth");

router.post("/register", bodyValidator(schemas.registerSchema), registerUser);

router.get("/verify/:verificationToken", verifyEmail);

router.post(
  "/verify",
  updateFavoriteStatus(schemas.emailSchema, "missing required field email"),
  resendVerify
);

router.post("/login", bodyValidator(schemas.loginSchema), userLogin);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logoutUser);

router.patch(
  "/",
  authenticate,
  updateFavoriteStatus(schemas.updateSubscriptionSchema, "subscription"),
  updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
