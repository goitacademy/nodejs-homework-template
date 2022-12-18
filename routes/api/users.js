const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { tryCatch, validation, auth, upLoad } = require("../../middlewares");
const {
  joiUsers: { signUp, logIn, subscription, joiReverifyEmailSchema },
} = require("../../schemas");

router.post("/signup", validation(signUp), tryCatch(ctrl.signUp));
router.post("/login", validation(logIn), tryCatch(ctrl.logIn));
router.get("/logout", auth, tryCatch(ctrl.logOut));
router.get("/verify/:verificationToken", tryCatch(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(joiReverifyEmailSchema),
  tryCatch(ctrl.reverifyEmail)
);

router.get("/current", auth, tryCatch(ctrl.getCurrent));
router.patch(
  "/:id/subscription",
  auth,
  validation(subscription),
  tryCatch(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upLoad.single("avatar"),
  tryCatch(ctrl.updateAvatar)
);

module.exports = router;
