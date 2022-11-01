const express = require('express')

const ctrl = require('../../controllers/contacts')

const { validateBody, authenticate } = require('../../middlewares')

const schemas = require('../../schemas/contacts')

const { ctrlWrapper } = require('../../helpers')

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getContactById))

router.post('/', authenticate, ctrlWrapper(ctrl.addContact))

router.put('/:contactId', authenticate, ctrlWrapper(ctrl.updateContactsById))

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite', authenticate, ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
