const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, addNewContact, deleteContact, updateContactById } = require('../../controllers/contacts');
const { validated } = require('../../middlewares/');
const addContactShema = require('../../shemas/contacts');

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.post('/', validated(addContactShema), addNewContact);
router.delete('/:id', deleteContact);
router.put('/:id', validated(addContactShema), updateContactById);

module.exports = router;