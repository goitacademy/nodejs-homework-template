const express = require("express");
const {validation, ctrlWrapper} = require('../../middlewares');
const {userSchema} = require('../../schemas');
const {auth:ctrl} = require('../../controllers');

const router = express.Router();

// signup
router.post("/register", validation(userSchema.register), ctrlWrapper(ctrl.register));

// signin
router.post("/login", validation(userSchema.login), ctrlWrapper(ctrl.login));

// signout
// router.post("/logout", validation(userSchema), ctrlWrapper(ctrl.login));

module.exports = router;
