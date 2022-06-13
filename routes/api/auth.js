const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const validateSchema = require("../../validation");
const { joiSignUpSchema } = require("../../models/user");

router.post("/signup", validateSchema(joiSignUpSchema), ctrl.signup);

module.exports = router;
