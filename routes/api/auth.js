const express = require("express");
const { authCtrls } = require("../../controllers");
const { authSchemas } = require("../../models");
const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(authSchemas.registerSchema), authCtrls.register);
router.post("/login", validateBody(authSchemas.loginSchema), authCtrls.login);
router.post("/logout", authenticate, authCtrls.logout);
router.get("/current", authenticate, authCtrls.getCurrent);
router.patch("/", authenticate, validateBody(authSchemas.updateSubSchema), authCtrls.updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatar"), authCtrls.updateAvatar);

module.exports = router;
