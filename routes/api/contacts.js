const express = require('express')
const router = express.Router()
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController,
  updateStatusContactController
} = require('../../controllers')
const {
  contactValidator,
  contactValidatorChanges,
  contactValidatorFavoriteChanges
} = require('../../middlewares/validations')

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', contactValidator, addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', contactValidatorChanges, changeContactController)

router.patch('/:contactId/favorite', contactValidatorFavoriteChanges, updateStatusContactController)

module.exports = router
