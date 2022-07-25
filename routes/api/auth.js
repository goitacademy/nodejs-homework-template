const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
