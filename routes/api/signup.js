const express = require('express');
const {validation, ctrlWrapper} = require("../../middlewares")
const {joiSchema} = require("../../models/user")

const {signUp: ctrl} = require("../../controllers/index")


const router = express.Router()

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp))

module.exports = router