const express = require("express");
const { auth } = require("../../middlewares");

const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionCtrl,
} = require("../../controllers");

router.post("/register", controllerWrapper(registrationCtrl));
router.post("/login", controllerWrapper(loginCtrl));
router.get("/logout", auth, controllerWrapper(logoutCtrl));
router.get("/current", auth, controllerWrapper(currentUserCtrl));
router.patch("/subscription", auth, controllerWrapper(subscriptionCtrl));

module.exports = router;
