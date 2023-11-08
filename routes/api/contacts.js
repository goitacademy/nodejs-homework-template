const express = require('express');
const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  upContact } = require('../../controllers/contactsController');

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getOneContact)

router.post('/', createContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', upContact)

module.exports = router
