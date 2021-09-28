const express = require('express')
const router = express.Router()

const { controllerWrapper, validation } = require('../../middlewares')
const { schema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:id', controllerWrapper(ctrl.getContactById))

router.post('/', validation(schema), controllerWrapper(ctrl.addContact))

router.delete('/:id', controllerWrapper(ctrl.removeContact))

router.put('/:id', validation(schema), controllerWrapper(ctrl.updateById))

module.exports = router
