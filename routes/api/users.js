const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { auth, upload } = require("../../middlewares");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", auth, ctrl.current);

router.get("/logout", auth, ctrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.avatars);

module.exports = router;
