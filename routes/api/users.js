const express = require("express");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signUp));

module.exports = router;
