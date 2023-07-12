const express = require("express");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars",authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;
