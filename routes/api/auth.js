const express = require("express");
const router = express.Router();
const { validateBody, aunthenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auths");

//  Sign up the user

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Login the user
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// Logout the user
router.post("/logout", aunthenticate, ctrl.logout);

// refresh the user

router.get("/current", aunthenticate, ctrl.getCurrent);

module.exports = router;
