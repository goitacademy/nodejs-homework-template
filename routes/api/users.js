const express = require("express");
const { users: ctrl } = require("../../controllers");
const { userAuth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/current", userAuth, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;
