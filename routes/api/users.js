const express = require("express");
const ctrlUser = require("../../controller/users");
const router = express.Router();

router.post("/signup", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.auth, ctrlUser.logout);

module.exports = router;