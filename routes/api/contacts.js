// routes/api/contacts.js
const express = require('express');
const addContactsController = require('../../controller/addcontacts');
const deleteContactsController = require('../../controller/deletecontacts');
const getContactsController = require('../../controller/getcontacts');
const updateContactsController = require('../../controller/updatecontacts');


const router = express.Router();

// Create a new contact
router.post('/', addContactsController.addContacts);

// Delete a contact by ID
router.delete('/:id', deleteContactsController.deleteContacts);

// Update a contact by ID
router.put('/:id', updateContactsController.updateContacts);

// Get all contacts
router.get('/', getContactsController.getContacts);



module.exports = router;
