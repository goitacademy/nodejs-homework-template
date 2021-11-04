const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers/index')
const { validation, controllerWrapper } = require('../../middlewars')
const { contactAddShema, contactUpdateShema } = require('../../validation')

router.get('/', controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactAddShema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(contactUpdateShema), controllerWrapper(ctrl.updateContact))

module.exports = router
