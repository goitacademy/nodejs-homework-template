const express = require("express");

const { ctrlWrapper, authWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
