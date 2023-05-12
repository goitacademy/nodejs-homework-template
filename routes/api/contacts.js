const express = require('express');

const router = express.Router();

const ctrlContacts = require('../../controllers/contacts');

router.get('/', ctrlContacts.getAll);

router.get('/:contactId', ctrlContacts.getById);

router.post('/', ctrlContacts.add);

router.delete('/:contactId', ctrlContacts.deleteById);

router.put('/:contactId', ctrlContacts.updateById);

module.exports = router;
