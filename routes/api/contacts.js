const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const ctrl = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateContact))

module.exports = router
