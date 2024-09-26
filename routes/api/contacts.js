const express = require('express');

const router = express.Router();

const { getContactList,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById } = require('../../controllers/contacts');

router.get('/', getContactList);

router.get('/:contactId', getOneContact);

router.post('/', addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContactById);

module.exports = router;
