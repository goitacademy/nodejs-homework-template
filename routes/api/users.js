const express = require('express')

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper, upload } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.patch('/:id', upload.single('avatarURL'), controllerWrapper(ctrl.updateImg))

module.exports = router
