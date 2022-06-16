const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signUp));
router.post("/signin", validation(joiLoginSchema), ctrlWrapper(ctrl.signIn));

module.exports = router;
