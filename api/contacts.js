const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../controllers');

router.post('/', express.json(), ctrl.add);

module.exports = router;
// router.get('/api/contacts', listContacts);

// router.get('/api/contacts/:contactId', getContactById);

// router.post('/api/contacts', addContact);

// router.delete('/api/contacts/:contactId', removeContact);

// router.put('/api/contacts/:contactId', updateContact);
