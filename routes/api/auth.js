const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/ctrlAuth")

const {validateBody, authenticate} = require("../../midllewares");

const {schemas} = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)


module.exports = router;