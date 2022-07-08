const express = require('express')
const router = express.Router()

const {ctrlWrapper, validation} = require("../../middleware")

const {userJoiSchema} = require('../../models/user')
const ctrl= require('../../controllers/auth')


router.post("/register", ctrlWrapper(ctrl.register))

module.exports = router