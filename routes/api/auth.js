const express = require("express");

const ctrl = require("../../controllers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");
const router = express.Router();

//signup
router.post(
  "/register", 
  validateBody(schemas.registerSchema),
   ctrl.register);
   
router.get(
  "/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
   validateBody(schemas.emailSchema),
    ctrl.resendVerify
   );

  
// signin
router.post(
  "/login", 
  validateBody(schemas.registerSchema), 
  ctrl.login);

router.get(
  "/current", 
  authenticate, 
  ctrl.getCurrent);

router.post(
  "/logout", 
  authenticate, 
  ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.changeUserSubscriptionSchema),
  ctrl.updateUserSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;