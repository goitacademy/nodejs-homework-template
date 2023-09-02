const express = require("express");

const {
  register,
  logIn,
  logOut,
  getCurrent,
  updateSubscriptions,
} = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");
const {
  registerScheme,
  logInScheme,
  updateSubscriptionSchema,
} = require("../../schemas/usersScheme.js");

const router = express.Router();

router.post("/register", validateBody(registerScheme), register);

router.post("/login", validateBody(logInScheme), logIn);

router.post("/logout", authenticate, logOut);

router.get("/current", authenticate, getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscriptions
);

module.exports = router;
