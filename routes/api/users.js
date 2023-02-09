const express = require("express");
const { authToken, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));
module.exports = router;
