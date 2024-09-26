const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/users");

router.post("/signup", ctrlContact.signup);

router.post("/login", ctrlContact.login);

router.post("/logout", ctrlContact.auth, ctrlContact.logout);

router.get("/current", ctrlContact.auth, ctrlContact.current);

module.exports = router;
