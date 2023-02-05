const express = require("express");
const router = express.Router();

const {
  ctrlSignup,
  ctrlLogin,
  ctrlCurrent,
  ctrlLogout,
  ctrlUpdateCurrent,
  ctrlUpdateAvatart,
} = require("../../controllers/authControllers");

const {
  addSignupValidation,
  addLoginValidation,
  addSubscriptionValidation,
} = require("../../middlewares/authValidation");

const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", addSignupValidation, ctrlSignup);

router.post("/login", addLoginValidation, ctrlLogin);

router.get("/current", auth, ctrlCurrent);

router.patch(
  "/current/subscription",
  auth,
  upload.single("avatart"),
  addSubscriptionValidation,
  ctrlUpdateCurrent
);

router.patch(
  "/current/avatars",
  auth,
  addSubscriptionValidation,
  ctrlUpdateAvatart
);

router.get("/logout", auth, ctrlLogout);

module.exports = router;
