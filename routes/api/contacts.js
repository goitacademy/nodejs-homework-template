const express = require('express')
const router = express.Router()
const { controllerWrapper, validation } = require('../../middlewares')
const contactSchema = require('../../schemas')

const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema.post), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(contactSchema.put), controllerWrapper(ctrl.updateContact))

module.exports = router
