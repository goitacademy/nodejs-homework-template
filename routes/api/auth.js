const express = require("express")
const router = express.Router()
const ctrl = require('../../controllers/auth')
const { schemas } = require("../../models/user")
const validateBody = require("../../middlewares/validateBody")

router.post("/register", validateBody(schemas.registerSchema),ctrl.register)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.post("/logout", validateBody(schemas.logoutSchema), ctrl.logout)

router.get("/users/current", validateBody(schemas.currentUserSchema), ctrl.currentUser)

module.exports = router