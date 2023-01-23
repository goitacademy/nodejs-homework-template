const express = require("express");
const ctrl = require("../../controllers/auth");
const router = express.Router();
const { validation, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", ctrl.resendVerifyEmail);

router.post("/login", validation(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
 "/avatars",
 authenticate,
 upload.single("avatar"),
 ctrl.updateAvatar,
);

module.exports = router;
