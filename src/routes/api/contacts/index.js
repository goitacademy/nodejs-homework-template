const express = require('express')
const router = express.Router()

const { contactsController } = require('../../../controller')
const guard = require('./../../../helpers/guard')
const {
  validationAddContact,
  validationUpdateContact,
  validationSetFavoriteContact,
} = require('./validate.js')

router
  .get('/', guard, contactsController.getContacts)
  .get('/:contactId', guard, contactsController.getContactById)
  .post('/', [guard, validationAddContact], contactsController.addContact)
  .delete('/:contactId', guard, contactsController.removeContact)
  .patch(
    '/:contactId',
    [guard, validationUpdateContact],
    contactsController.updateContact,
  )
  .patch(
    '/:contactId/favorite',
    [guard, validationSetFavoriteContact],
    contactsController.updateContactFavorite,
  )
module.exports = router