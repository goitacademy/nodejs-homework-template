const express = require('express');
const router = express.Router();

const { register, login, getCurrent, logout, updateSubscription, updateAvatar } = require("../../controllers/auth")
const { authenticate, joiAuthValidation, upload } = require("../../middlewares")

router.post("/register", joiAuthValidation.register, register);

router.post("/login", joiAuthValidation.register, login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/users", authenticate, joiAuthValidation.subscription, updateSubscription);

router.patch("/users/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;