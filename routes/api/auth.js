const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");

const { auth: ctrl } = require("../../contlollers");

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
