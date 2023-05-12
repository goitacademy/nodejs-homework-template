const express = require("express");
const {validateBody} = require("../../middlewares");
const {schemas} = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register); 

// signin   
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
