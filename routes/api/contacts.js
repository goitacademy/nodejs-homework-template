const express = require('express');

const {
  getContactsList,
  getContact,
  deleteContact,
  createContact,
  changeContact,
} = require('../../controllers/index');

const router = express.Router();

router.get('/', getContactsList);

router.get('/:contactId', getContact);

router.post('/', createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', changeContact);

module.exports = router;
