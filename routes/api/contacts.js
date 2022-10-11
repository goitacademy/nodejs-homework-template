const express = require('express')

const {ctrlWrapper} = require('../../helpers');
const {auth} = require('../../middlewares')
const {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact} = require('../../controllers/contacts')
  const {contactValidation, favoriteValidation} = require('../../models/contact')

const router = express.Router()

router.get('/', auth, ctrlWrapper(getContacts))

router.get('/:contactId', auth, ctrlWrapper(getContactsById))

router.post('/', contactValidation, auth, ctrlWrapper(addContact))

router.put('/:contactId', contactValidation, auth, ctrlWrapper(updateContact))

router.patch('/:contactId/favorite', favoriteValidation, auth, ctrlWrapper(updateStatusContact))

router.delete('/:contactId', contactValidation, auth, ctrlWrapper(removeContact))


module.exports = router;




