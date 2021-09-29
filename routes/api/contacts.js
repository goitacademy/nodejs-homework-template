/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router