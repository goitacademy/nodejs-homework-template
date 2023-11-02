const express = require('express');
const { getAll, getById, postContact, putContact, deleteContact } = require('../../controllers/contacts.js');

const router = express.Router();

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', postContact);
router.put('/:contactId', putContact);
router.delete('/:contactId', deleteContact);

module.exports = router;
