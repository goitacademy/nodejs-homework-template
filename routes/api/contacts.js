const express = require('express');
const router = express.Router();
const {
  getListOfContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updatePhone
} = require('../../controllers/controllers');
const { contactCreate, contactUpdate } = require('./validation');

router.get('/', getListOfContacts)

router.get('/:contactId', getContactById)
// create contact
router.post('/', contactCreate, createContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContact)

router.patch('/:contactId', contactUpdate, updatePhone)


module.exports = router
