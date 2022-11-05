const express = require('express')
const router = express.Router()

const {schemas} = require('../../models/user')
const {validateBody} = require('../../middlewares')
const {register, login, logout, current} = require('../../controllers/auth')
const {ctrlWrapper} = require('../../helpers')
const {isAuthorized} = require('../../middlewares')

router.get('/users/current', isAuthorized, ctrlWrapper(current))
router.post('/users/register', validateBody(schemas.validateRegisterSchema), ctrlWrapper(register))
router.post('/users/login', validateBody(schemas.validateRegisterSchema), ctrlWrapper(login))
router.post('/users/logout',isAuthorized, ctrlWrapper(logout))

module.exports = router