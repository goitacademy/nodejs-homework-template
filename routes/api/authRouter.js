const express = require("express");
const router = express.Router();

const {
  ctrlSignup,
  ctrlLogin,
  ctrlCurrent,
  ctrlLogout,
  ctrlUpdateCurrent,
} = require("../../controllers/authControllers");

const {
  addSignupValidation,
  addLoginValidation,
  addSubscriptionValidation,
} = require("../../middlewares/authValidation");

const { auth } = require("../../middlewares/auth");

router.post("/signup", addSignupValidation, ctrlSignup);

router.post("/login", addLoginValidation, ctrlLogin);

router.get("/current", auth, ctrlCurrent);

router.patch(
  "/current/subscription",
  auth,
  addSubscriptionValidation,
  ctrlUpdateCurrent
);

router.get("/logout", auth, ctrlLogout);

module.exports = router;
