const express = require("express");
const router = express.Router();

const { validation, auth, upload } = require("../../middlewars");
const { users: controllers } = require("../../controllers");
const {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models/user");
router.post("/signup", validation(joiSignupSchema), controllers.signup);
router.post("/login", validation(joiLoginSchema), controllers.login);
router.get("/current", auth, controllers.currentUser);
router.post("/logout", auth, controllers.logout);
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  controllers.updateSubscription
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
