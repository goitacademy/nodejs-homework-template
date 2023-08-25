const express = require("express");

const ctrl = require("../../controllers/auth")

const router = express.Router();

const  {validateBody, authenticate}  = require("../../middlewares");
const { registerUserSchema, loginUserSchema } = require("../../schemasValidation/authSchema")

router.post("/users/register", validateBody(registerUserSchema), ctrl.registration )

router.post("/users/login", validateBody(loginUserSchema), ctrl.login)

router.get("/users/current", authenticate, ctrl.getCurrent)

router.post("/users/logout", authenticate, ctrl.logout)

module.exports = router;