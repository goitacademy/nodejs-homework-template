const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth")

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify))

router.get("/verify", validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail))


router.post("/login", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;
