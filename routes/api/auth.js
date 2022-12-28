const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();
// signup
router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

// login
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
