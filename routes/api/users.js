const express = require("express");
const router = express.Router();
const userCtrl = require("../../controller/user");
const auth = require("../../middleware/auth");

router.post("/signup", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", auth, userCtrl.logout);
router.get("/current", auth, userCtrl.getCurrent);

module.exports = router;
