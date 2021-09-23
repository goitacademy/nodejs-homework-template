const express = require('express')

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateById))

module.exports = router
