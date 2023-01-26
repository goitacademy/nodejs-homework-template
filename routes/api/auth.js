const express = require("express");
const {validation, ctrlWrapper} = require('../../middlewares');
// const {} = require('../../models/users');
const {userSchema} = require('../../schemas');
const {auth:ctrl} = require('../../controllers');

const router = express.Router();

// signup
router.post("/register", validation(userSchema.register), ctrlWrapper(ctrl.register));
router.get("/register", ctrlWrapper(ctrl.getAll)); // to check myself

// signin
// router.post("/login", validation(userSchema.login), ctrlWrapper(ctrl.login));

// signout
// router.post("/logout", validation(userSchema), ctrlWrapper(ctrl.login));

module.exports = router;
