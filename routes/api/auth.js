const express = require("express");
const { validation, ctrlWrapper, checkJwt } = require("../../middlewares");
const { joiUserSchemas } = require("../../models");
const { auth: ctrl } = require("../../controller");

const router = express.Router();

router.post("/signup", validation(joiUserSchemas.joiSingUpSchema), ctrlWrapper(ctrl.signUp));
router.post("/signin", validation(joiUserSchemas.joiSingInSchema), ctrlWrapper(ctrl.signIn));
router.post("/logout", checkJwt, ctrlWrapper(ctrl.logOut));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
    "/verify",
    validation(joiUserSchemas.joiVerifyEmailSchema),
    ctrlWrapper(ctrl.resendEmail)
);

module.exports = router;
