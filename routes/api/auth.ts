import express from "express";

const {
  registration,
  login,
  logout,
  verify,
  reverify,
} = require("../../controllers/auth/index");
const {
  getCurrentUser,
  updateSubscription,
  avatar,
} = require("../../controllers/users/index");
const limiter = require("../../middleware/rate-limit");
const guard = require("../../middleware/guard");
const upload = require("../../middleware/upload");
const { validateBody } = require("../../middleware/validation");
const { wrapper } = require("../../middleware/error-handler");
const {
  schemaSignupUser,
  schemaLoginUser,
  schemaSubscriptionUser,
  schemaVerifyUser,
} = require("../../models/contacts-validation-schemes");
const router = express.Router();

router.post(
  "/signup",
  limiter(15 * 60 * 1000, 2),
  validateBody(schemaSignupUser),
  wrapper(registration)
);
router.post("/login", validateBody(schemaLoginUser), wrapper(login));
router.post("/verify", validateBody(schemaVerifyUser), wrapper(reverify));
router.get("/logout", guard, wrapper(logout));

router.get("/current", guard, wrapper(getCurrentUser));
router.get("/verify/:verificationToken", wrapper(verify));

router.patch(
  "/",
  guard,
  validateBody(schemaSubscriptionUser),
  wrapper(updateSubscription)
);
router.patch("/avatars", guard, upload.single("avatar"), wrapper(avatar));

module.exports = router;
