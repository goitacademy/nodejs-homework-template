const express = require('express')

const ctrl = require('../../controllers/contacts')

const { validateBody } = require('../../middlewares')

const schemas = require('../../schemas/contacts')

const { ctrlWrapper } = require('../../helpers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', ctrlWrapper(ctrl.addContact))

router.put('/:contactId', ctrlWrapper(ctrl.updateContactsById))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

module.exports = router
