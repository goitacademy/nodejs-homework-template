const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { auth, ctrlWrapper } = require("../../middlewares");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
