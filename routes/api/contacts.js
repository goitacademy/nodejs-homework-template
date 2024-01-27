import express from 'express';
import { showContact } from '#controllers/contacts/showContacts.js';
import { indexContacts } from '#controllers/contacts/indexContacts.js';
import { createContact } from '#controllers/contacts/createContacts.js';
import { deleteContact } from '#controllers/contacts/deleteContacts.js';
import { updateContacts } from '#controllers/contacts/updateContacts.js';
import { updateStatusContact } from '#controllers/contacts/updateStatusContact.js';

const router = express.Router();

router.get('/', indexContacts);
router.post('/', createContact);
router.get('/:contactId', showContact);
router.put('/:contactId', updateContacts);
router.delete('/:contactId', deleteContact);
router.patch('/:contactId/favorite', updateStatusContact);

export { router };