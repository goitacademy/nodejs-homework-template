const express = require("express")
const {validateBody, authentificate, upload} = require("../../middkewares")
const schemas = require("../../schemas/users")
const router = express.Router()
const ctrl = require("../../controllers/auth")
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout)
router.patch("/avatars", authentificate, upload.single("avatar"), ctrl.updateAvatar)
module.exports = router