const express = require('express');
const { authenticate, validation, ctrlWrapper } = require("../../middlewares");
const { joiSingipSchema, joiLoginSchema, joiResendVerificationSchema, } = require("../../models");
const { auth: authCtrl } = require("../../controllers");

const router = express.Router();

router.post(
    "/singnup",
    validation(joiSingipSchema),
    ctrlWrapper(authCtrl.singip)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(authCtrl.login));

router.get("/logout", authenticate, ctrlWrapper(authCtrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(authCtrl.verifyEmail));

router.post(
    "/verify",
    validation(joiResendVerificationSchema),
    ctrlWrapper(authCtrl.resendEmail)
);

module.exports = router;


