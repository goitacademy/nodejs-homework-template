const express = require("express");

const router = express.Router();

const {
  register,
  logIn,
  logOut,
  currentUser,
  updateUserSubscription,
} = require("../../controllers");

const { schemas } = require("../../models/user");
const { authenticate, validateBody } = require("../../middlewares");

router.post("/register", validateBody(schemas.userValidator), register);

router.post("/login", validateBody(schemas.userValidator), logIn);

router.post("/logout", authenticate, logOut);

router.get("/current", authenticate, currentUser);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.userSubscriptionValidator),
  updateUserSubscription
);

module.exports = router;
