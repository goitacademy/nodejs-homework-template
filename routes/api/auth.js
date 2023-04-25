const router = require("express").Router();
const {
  bodyValidator,
  authenticate,
  updateFavoriteStatus,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const {
  registerUser,
  userLogin,
  getCurrent,
  logoutUser,
  updateSubscription,
} = require("../../controllers/auth");

router.post("/register", bodyValidator(schemas.registerSchema), registerUser);

router.post("/login", bodyValidator(schemas.loginSchema), userLogin);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logoutUser);

router.patch(
  "/",
  authenticate,
  updateFavoriteStatus(schemas.updateSubscriptionSchema, "subscription"),
  updateSubscription
);

module.exports = router;
