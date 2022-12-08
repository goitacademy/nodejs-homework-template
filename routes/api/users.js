const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { tryCatch, validation, auth } = require("../../middlewares");
const {
  joiUsers: { signUp, logIn, subscription },
} = require("../../schemas");

router.post("/signup", validation(signUp), tryCatch(ctrl.signUp));
router.post("/login", validation(logIn), tryCatch(ctrl.logIn));
router.get("/logout", auth, tryCatch(ctrl.logOut));
router.get("/current", auth, tryCatch(ctrl.getCurrent));
router.patch(
  "/:id/subscription",
  auth,
  validation(subscription),
  tryCatch(ctrl.updateSubscription)
);
module.exports = router;
