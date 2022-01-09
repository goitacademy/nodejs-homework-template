const express = require("express");
const { controllerWrap, authenticate } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, controllerWrap(ctrl.current));

module.exports = router;
