const express = require("express");

const ctrl = require("../../controllers/auth");
const currentCtrl = require("../../controllers/users");

const { wrapper } = require("../../helpers/wrapper");

const { authenticate, validateBody, upload } = require("../../middleware");

const { registerSchema, loginSchema } = require("../../validation/validation");

const router = express.Router();

router.post("/signup", validateBody(registerSchema), wrapper(ctrl.register));

router.post("/login", validateBody(loginSchema), wrapper(ctrl.login));

router.get("/logout", authenticate, wrapper(ctrl.logout));

router.patch("/avatars", authenticate, upload.single("avatar"), wrapper(ctrl.updateAvatar))

router.get("/current", authenticate, wrapper(currentCtrl.getCurrent));

module.exports = router;
