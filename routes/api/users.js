const express = require("express");
const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { joiSignupSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
