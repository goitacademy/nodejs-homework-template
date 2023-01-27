const express = require("express");
const router = express.Router();
const ctrl  = require("../../controllers/auth")
const { validateBody, authenticate,upload } = require("../../middleware");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { registerSchema, loginSchema } = require("../../models/user");



router.post("/register", validateBody(registerSchema), ctrlWrapper(ctrl.register))

router.post("/login",validateBody(loginSchema),ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify));

router.patch("/avatars",authenticate,upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;