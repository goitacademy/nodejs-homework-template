const express = require("express")

const router = express.Router()

const {validateBody} = require("../../utils")

const schema = require("../../schema/users")

const {authenticate} = require("../../middlewares")

const authController = require("../../controllers/auth-controllers")

// signup
router.post("/register", validateBody(schema.userRegisterSchema), authController.register)

// signin
router.post("/login", validateBody(schema.userLoginSchema), authController.login)

router.get("/current", authenticate, authController.current)

router.post("/logout", authenticate, authController.logout)

router.patch("/", authenticate,validateBody(schema.subscriptionSchema), authController.subscription)

module.exports = router;