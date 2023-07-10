const express = require("express");
const router = express.Router();
const ctrlTask = require("../../controller/users.js");
const { auth } = require("../../controller/tokenAuth.js");

router.post("/signup", ctrlTask.register);

router.post("/login", ctrlTask.login);

router.get("/logout", auth, ctrlTask.logout);

router.get("/current", auth, ctrlTask.current);

router.patch("/subscription", auth, ctrlTask.subscription);

module.exports = router;
