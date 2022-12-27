const express = require('express')

const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema} = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;