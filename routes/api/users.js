const express = require("express");

const { ctrlWrapper, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { authValidation } = require("../../middlewares");

const router = express.Router();

router.get("/current", authValidation, auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
