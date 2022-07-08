const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper, validation} = require("../../middleware")

const {schemas} = require("../../models/user")

const router = express.Router()

router.post("/register", validation(schemas.register), ctrlWrapper(ctrl.register))

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login))

router.post("/logout", ctrlWrapper(ctrl.logout))

module.exports = router