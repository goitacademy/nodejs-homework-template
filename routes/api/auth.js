const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middelwars");
const { schema } = require("../../models/user");
const ctrl = require("../../controler/auth");
router.post("/register", validateBody(schema.registerSchema), ctrl.regiser);
router.post("/login", validateBody(schema.loginSchema), ctrl.login);
module.exports = router;
