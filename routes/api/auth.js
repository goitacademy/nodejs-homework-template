const express = require('express')
const {ctrlWrapper, validation} = require("../../middleware")
const {userJoiSchema} = require('../../models/auth')
const ctrl = require('../../controllers/auth')
const router = express.Router()


router.post('/register', validation(userJoiSchema.register) , ctrlWrapper(ctrl.register))

module.exports = router