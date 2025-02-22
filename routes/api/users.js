const express = require('express');
const controller = require('../../controllers');
const {authenticate, upload} = require("../../middlewares");

const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/current", authenticate, controller.getCurrent);

router.post("/logout", authenticate, controller.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), controller.updateAvatar);

module.exports = router