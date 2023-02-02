const express = require("express");

// const  = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { authValidation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post("/register", authValidation, ctrlWrapper(ctrl.register));
router.post("/login", authValidation, ctrlWrapper(ctrl.login));
module.exports = router;
