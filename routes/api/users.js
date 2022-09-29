const express = require('express');
const { validation, ctrlWrapper } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models");

const router = express.Router();

router.post("/register", validation(joiUserSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));

module.exports = router;