const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const validation = require("../../middlewares/validation");

const { schemas } = require("../../models/user");

// signup
router.post("/signup", validation(schemas.signupSchema), ctrl.signup);
// router.post("/signup", ctrl.signup);

// login
router.post("/login", validation(schemas.loginSchema), ctrl.login);
// router.post("/login", ctrl.login);

module.exports = router;
