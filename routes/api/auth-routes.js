const express = require("express");

const router = express.Router();

const validation = require("../../utils/validation");
const controllers = require("../../controllers/auth-controllers");
const { authenticate, upload } = require("../../middlewares");


router.post("/register", validation.validateRegistration, controllers.register);
router.post("/login", validation.validateLogin, controllers.login);
router.get("/current", authenticate, controllers.getCurrent);
router.post("/logout", authenticate, controllers.logout);
router.patch('/', authenticate, validation.validateSubscription, controllers.updateSubscription);
router.patch('/avatars', authenticate, upload.single("avatar"), controllers.updateAvatar);

module.exports = router;