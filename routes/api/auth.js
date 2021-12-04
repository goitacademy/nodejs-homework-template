/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { userRegisterJoiSchema, userLoginJoiSchema } = require("../../models");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(userLoginJoiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
