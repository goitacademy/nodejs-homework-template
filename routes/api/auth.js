const express = require("express");

const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { auth: ctrl } = require("../../controllers");
const { authValidation } = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", authValidation, ctrlWrapper(ctrl.register));

module.exports = router;
