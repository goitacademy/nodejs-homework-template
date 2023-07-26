const express = require("express");
const ctrl = require("../../controllers/auth");

// const ctrl = require("../../controllers");


const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares");
const router = express.Router();

//sinup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
//sinin
router.post("/login",validateBody(schemas.loginSchema), ctrl.login);


module.exports = router;