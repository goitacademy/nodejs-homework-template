const express = require("express");

const { registerValid, loginValid, updateSubscriptionValid }  = require("../../middlewares/authValidation");

const  authCtrl  = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");


const router = express.Router();

router.post(
  "/register",
  registerValid,
  authCtrl.register
);

router.post("/login", loginValid, authCtrl.login);

router.post("/logout", authenticate, authCtrl.logout);

router.get("/current", authenticate, authCtrl.getCurrent);

router.patch(
  "/",
  authenticate,
  updateSubscriptionValid,
  authCtrl.updateSubscription
);

module.exports = router;