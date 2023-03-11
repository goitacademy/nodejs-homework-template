const express = require("express");
const { validateBody, authenticate} = require("../../middlewares");
const {authCntr} = require("../../controllers/")
const { schemas } = require("../../model/user")

const { login, register, getCurrent, logout } = authCntr;

console.log(login, register)

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout)


module.exports = router;