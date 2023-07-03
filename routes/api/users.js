const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  validation,
  userJoi,
  subscriptionJoi,
} = require("../../middleware");
const { users } = require("../../controllers");

const validUser = validation(userJoi);
const validSubscription = validation(subscriptionJoi);

router.post("/signup", validUser, users.signup);
router.post("/login", validUser, users.login);
router.get("/logout", authMiddleware, users.logout);
router.get("/current", authMiddleware, users.getCurrent);
router.patch("/", authMiddleware, validSubscription, users.updateSubscription);

module.exports = router;
