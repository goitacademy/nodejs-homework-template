const express = require("express");
const { validateBody} = require("../../middlewares");
const {authCntr} = require("../../controllers/")
const { schemas } = require("../../model/user")

const { login, register } = authCntr;

console.log(login, register)

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login)


module.exports = router;