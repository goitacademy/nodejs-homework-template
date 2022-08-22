const express = require("express");
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  updateUserSubscription,
} = require("../../controller/usersController");

const {
  userValidationSchema,
  userSubscriptionSchema,
} = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");

const router = express.Router();

router.post("/signup", validation(userValidationSchema), signUpUser);

router.post("/login", validation(userValidationSchema), logInUser);

router.get("/logout", authMW, logOutUser);

router.get("/current", authMW, getCurrentUser);

router.patch(
  "/",
  authMW,
  validation(userSubscriptionSchema),
  updateUserSubscription
);

module.exports = router;
