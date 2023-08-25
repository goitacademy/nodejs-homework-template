const express = require("express");

const ctrl = require("../../controllers/auth")

const router = express.Router();

const  {validateBody}  = require("../../middlewares");
const { registerUserSchema, loginUserSchema } = require("../../schemasValidation/authSchema")

router.post("/users/register", validateBody(registerUserSchema), ctrl.registration )

router.post("/users/login", validateBody(loginUserSchema), ctrl.login)

module.exports = router;