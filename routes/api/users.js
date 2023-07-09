const express = require("express");
const ctrls = require("../../controllers/users");
const { validateBody, checkToken } = require("../../middleware/index");
const {
  userValidationSchema,
  userSubscriptionSchema,
} = require("../../models/joiSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(userValidationSchema),
  ctrls.registerUser
);

router.post("/login", validateBody(userValidationSchema), ctrls.loginUser);

router.post("/logout", checkToken, ctrls.logoutUser);

router.get("/current", checkToken, ctrls.currentUser);

router.patch(
  "/",
  // some adminCheckToken,
  validateBody(userSubscriptionSchema),
  ctrls.setSubscription
);

module.exports = router;
