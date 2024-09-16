const express = require("express");
const { validateRegister, validateLogin, validateUpdSubscrip } = require('../../utils/validation')
const authenticate = require("../../utils/authenticate")
const {upload} = require('../../middlewares')
const { register, login, getCurrent, logout, updateUserSubscript, updateAvatar } = require('../../controllers/auth-controllers')

const router = express.Router();

// signup
router.post("/register", validateRegister, register);

// signin
router.post("/login", validateLogin, login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

// subscription
router.patch("/", authenticate, validateUpdSubscrip, updateUserSubscript);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;