const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const validate = require("../../middlewares/validation");
const { joiSignUpSchema } = require("../../models/user");

router.post("/signup", validate(joiSignUpSchema), ctrl.signup);

module.exports = router;
