const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper, validation} = require("../../middleware")

const {schemas} = require("../../models/user")

const router = express.Router()

router.post("/register", validation(schemas.register), ctrlWrapper(ctrl.register))

module.exports = router