const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const validate = require("../../middlewares/validation");
const { joiUserSchema } = require("../../models/user");

router.post("/signup", validate(joiUserSchema), ctrl.signup);

router.post("/login", validate(joiUserSchema), ctrl.login);

module.exports = router;
