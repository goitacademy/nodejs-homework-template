const express = require("express");

const { validation, ctrlWrapper } = require("../..//middleware");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
