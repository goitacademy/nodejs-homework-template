const express = require("express");
const router = express.Router();

const { authVerifyToken, ctrlWrapper } = require("../../middleware");
const { users: ctrl } = require("../../controllers");


router.get("/current", authVerifyToken, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
