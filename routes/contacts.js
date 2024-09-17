const express = require('express');

const ContactController = require('../controllers/contact')

const router = express.Router();
const jsonParser = express.json();

// Get all contacts
router.get('/', ContactController.getContacts);

// Get by by id
router.get('/:id', ContactController.getContact);

// Create contact
router.post('/', jsonParser, ContactController.createContact);

// Update contact
router.put('/:id', jsonParser, ContactController.updateContact);

// Delete contact
router.delete('/:id', ContactController.deleteContact);


module.exports = router;


