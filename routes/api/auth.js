const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");
const { auth: ctrl } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../schemas/userSchema");

router.post("/signup", validation(joiSignupSchema), ctrl.signup);

router.post("/login", validation(joiLoginSchema), ctrl.login);

module.exports = router;
