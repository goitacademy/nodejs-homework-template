const express = require("express");

const ctrl = require("../../controllers/auth")

const {validateBody, authenticate, upload} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();



router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;