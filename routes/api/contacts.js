const express = require('express')

const router = express.Router()

const {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  changeContact,
} = require('../../contollers/contactsControllers');

const {
  addContactValidation,
  putContactValidation,
} = require ('../../middlewares/validationMiddlewares');

router.get('/', getContacts);

router.get('/:contactId', getContact);

router.post('/', addContactValidation, addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', putContactValidation, changeContact);

module.exports = router
