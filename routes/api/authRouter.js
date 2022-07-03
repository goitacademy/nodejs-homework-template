const express = require("express");
const router = express.Router();

const { signup, login, getCurrent } = require("../../controllers");

router.post("/users/signup", signup);

router.post("/users/login", login);

router.get("/users/current", getCurrent);

module.exports = router;
