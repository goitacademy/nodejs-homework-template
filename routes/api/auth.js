const express = require('express')
const router = express.Router()

const {schemas} = require('../../models/user')
const {validateBody} = require('../../middlewares')
const {register, login} = require('../../controllers/auth')
const {ctrlWrapper} = require('../../helpers')

router.post('/users/register', validateBody(schemas.validateRegisterSchema), ctrlWrapper(register))
router.post('/users/login', validateBody(schemas.validateRegisterSchema), ctrlWrapper(login))

module.exports = router