const express = require('express')

const { controllerWrapper } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers/contacts')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', controllerWrapper(ctrl.updateContact))

module.exports = router
