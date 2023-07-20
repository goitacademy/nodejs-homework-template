const express = require('express');

const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

const { getContactList,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById } = require('../../controllers/contacts');

router.get('/', getContactList);

router.get('/:contactId', isValidId, getOneContact);

router.post('/', addNewContact);

// router.delete('/:contactId', isValidId, deleteContact);

// router.put('/:contactId', isValidId, updateContactById);

module.exports = router;
