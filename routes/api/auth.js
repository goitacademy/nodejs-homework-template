const express = require("express");


const { auth: ctrl } = require("../../controllers");
const { auth, authValidation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post("/register", authValidation, ctrlWrapper(ctrl.register));
router.post("/login", authValidation, ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
