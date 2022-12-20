const express = require("express");
const { validate } = require("../../schema/schema");

const { signup: ctrl } = require("../../controllers/");
const { joyRegisterSchema } = require("../../models/users");
const { auth } = require("../../midlewares");

const router = express.Router();

router.post("/signup", validate(joyRegisterSchema), ctrl.register);

router.post("/login", validate(joyRegisterSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

module.exports = router;
