const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { authh, ctrlWrapper, validation } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authh, ctrlWrapper(ctrl.logout));

module.exports = router;
