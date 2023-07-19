const express = require("express")
const {validateBody, authentificate} = require("../../middkewares")
const schemas = require("../../schemas/users")
const router = express.Router()
const ctrl = require("../../controllers/auth")
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout)
module.exports = router