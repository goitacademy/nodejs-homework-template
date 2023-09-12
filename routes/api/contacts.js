const express = require('express');
const {getAllContacts, updateContact, getContact, deleteContact, createContact} = require("../../controllers/contactController");

const router = express.Router();

router.get('/', getAllContacts)

router.get('/:contactId', getContact)

router.post('/', createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContact);

module.exports = router
