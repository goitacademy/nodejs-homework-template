// created by Irina Shushkevych
const express = require('express')
const {ctrlWrapper} = require('../../middlewares')
const { contactsCtrl: ctrl } = require('../../controllers')
const { validate } = require('../../middlewares')
const { contactSchema: schema } = require('../../models')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validate(schema.joiAddContactSchema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', validate(schema.joiAddContactSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId', validate(schema.joiUpdateContactSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorites', validate(schema.joiUpdateContactFavoritsScheme), ctrlWrapper(ctrl.updateContactFavorites))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

module.exports = router
