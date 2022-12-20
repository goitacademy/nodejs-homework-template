const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  addContactValidation,
  putContactValidation,
  favoriteValidation,
  userValidation,
  loginValidation,
  subscriptionValidation,
  verifyEmailSchema,
} = require("../../middlewares/validationMiddlewares");
const ctrl = require("../../controllers/auth");
const { files: filesCtrl } = require("../../controllers");
const { authenticate, upload } = require("../../middlewares");

// SIGN UP
router.post("/signup", userValidation, asyncWrapper(ctrl.signup));

// SIGN IN
router.post("/login", loginValidation, asyncWrapper(ctrl.login));

//GET CURRENT
router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));

//LOG OUT
router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

// SUBSCRIPTION
router.patch(
  "/",
  authenticate,
  subscriptionValidation,
  asyncWrapper(ctrl.subscriptionStatus)
);

// AVATARS UPDATE
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  asyncWrapper(filesCtrl.updateAvatar)
);

//VERIFICATION

router.get("/verify/:verificationToken", asyncWrapper(ctrl.verify));

//VERIFY
router.post("/verify", verifyEmailSchema, asyncWrapper(ctrl.resendVerify));

module.exports = router;
