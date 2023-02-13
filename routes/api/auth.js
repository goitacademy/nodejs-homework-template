const express = require("express");
const { auth: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.log));

router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));

module.exports = router;
