const express = require("express");

const { ctrlWrapper, auth } = require("../../middlewares");

const { users: ctrl } = require("../../contlollers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
