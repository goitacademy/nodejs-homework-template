const express = require("express");

const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/users/signup", validateBody(schemas.signupSchema), ctrl.signup);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
