const express = require('express');
const router = express.Router();
const { contactCreate, contactUpdate } = require('./validation');
const {
  getListOfContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updatePhone
} = require('../../controllers/contacts');

const guard = require('../../helpers/guard')

router.get('/', guard, getListOfContacts)

router.get('/:contactId', guard, getContactById)
// create contact
router.post('/', guard, contactCreate, createContact)

router.delete('/:contactId', guard, deleteContact)

router.put('/:contactId', guard, updateContact)

router.patch('/:contactId', guard, contactUpdate, updatePhone)


module.exports = router
