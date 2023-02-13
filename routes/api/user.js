const express = require("express");
const { user: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

module.exports = router;
