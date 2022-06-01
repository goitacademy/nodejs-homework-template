const express = require('express')
const router = express.Router()

const {
  getListContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contactsController')

const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../middlewares/validation')

router.get('/', getListContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', validationAddContact, addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', validationUpdateContact, updateContactController)

router.patch('/:contactId/favorite', validationUpdateStatusContact, updateStatusContactController)

module.exports = router
