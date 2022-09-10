const express = require("express");

const ctrl = require("../../controllers/users");

const {ctrlWrapper} = require("../../helpers");

const {validationBody, authenticate, upload} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/signup", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validationBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

// signin
router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

router.patch("/", authenticate, validationBody(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;