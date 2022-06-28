const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");
const { currentUsers: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;
