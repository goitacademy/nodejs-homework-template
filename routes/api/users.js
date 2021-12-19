const express = require("express");

const { authenticate, controllerWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));

module.exports = router;
