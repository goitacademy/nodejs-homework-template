const express = require("express");
const router = express.Router();
const { ctrlWrapper, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
