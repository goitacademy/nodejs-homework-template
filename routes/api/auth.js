const express = require('express');

const {validateBody, authenticate, upload, isEmptyBody} = require('../../middlewares/index');

const {schemas} = require('../../models/users');

const ctrl = require('../../controllers/auth');

const router = express.Router();

 
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, isEmptyBody, upload.single("avatar"), ctrl.updateAvatart);

module.exports = router;