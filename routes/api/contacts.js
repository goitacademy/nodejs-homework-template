// created by Irina Shushkevych
const express = require('express')
const { ctrlWrapper, validate, auth } = require('../../middlewares')
const { contactsCtrl: ctrl } = require('../../controllers')
const { contactSchema: schema } = require('../../models')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById))

router.post('/', auth, validate(schema.joiAddContactSchema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', auth, validate(schema.joiAddContactSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId', auth, validate(schema.joiUpdateContactSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorites', auth, validate(schema.joiUpdateContactFavoritsScheme), ctrlWrapper(ctrl.updateContactFavorites))

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact))

module.exports = router
