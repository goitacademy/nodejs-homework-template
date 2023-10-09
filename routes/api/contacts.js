const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, updateContactById, deleteContact } = require('../../controllers/contacts');

router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.put('/:id', updateContactById);
router.delete('/:id', deleteContact);

module.exports = router;
