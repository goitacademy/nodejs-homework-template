const express = require("express")

const router = express.Router()

const {validateBody} = require("../../utils")

const schema = require("../../schema/users")

const authController = require("../../controllers/auth-controllers")

// signup
router.post("/register", validateBody(schema.userRegisterSchema), authController.register)

// signin
router.post("/login", validateBody(schema.userLoginSchema), authController.login)
module.exports = router;