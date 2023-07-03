const express = require("express");

const ctrl = require("../../controllers/auth");


const { validateBody, authenicate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validateBody(schemas.registrationSchema),
  ctrl.registration
);

// router.get("/verify/:verificationToken", ctrl.verifyEmail)

// router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendEmail)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenicate, ctrl.getCurrent);

router.post("/logout", authenicate, ctrl.logout);

router.patch(
  "/avatars",
  authenicate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
