const express = require('express')
const {users: ctrl} = require('../../src/controllers')
const {validation, auth, upload} = require('../../src/middlewares')
const {updateContactStatusJoiSchema} = require('../../models/contactSchema')


const router = express.Router()

router.get('/current', auth, ctrl.getCurrent)

router.get('/all', auth, ctrl.getUsers)

router.patch('/avatars', auth, upload.single('avatar'), ctrl.uploadAvatar)

router.patch('/', auth, validation(updateContactStatusJoiSchema), ctrl.updateSubscription)

module.exports = router
