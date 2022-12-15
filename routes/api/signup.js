const express = require("express");
const { validate } = require("../../schema/schema");

const { signup: ctrl } = require("../../controllers/");
const { joyRegisterSchema } = require("../../models/users");

const router = express.Router();

router.post("./signup", validate(joyRegisterSchema), ctrl.register);

module.exports = router;
