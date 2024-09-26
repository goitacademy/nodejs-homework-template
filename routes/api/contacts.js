const express = require('express');

const router = express.Router();

const getAll = require('../../controllers/contacts/getAllContacts');
const addContact = require('../../controllers/contacts/addContacts');
const getContactById = require('../../controllers/contacts/getContactsById');
const deleteById = require('../../controllers/contacts/deleteContact');
const updateContact = require('../../controllers/contacts/updateContacts');

router.get('/', getAll);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.delete('/:contactId', deleteById);

router.put('/:contactId', updateContact);

module.exports = router;
