import express from 'express';
import { indexContacts } from '../../controllers/contacts/indexContacts.js';
import { showContacts } from '../../controllers/contacts/showContacts.js';
import { createContacts } from '../../controllers/contacts/createContact.js';
import { updateContacts } from '../../controllers/contacts/updateContacts.js';
import { deleteContacts } from '../../controllers/contacts/deleteContacts.js';
import { updateStatus } from '../../controllers/contacts/updateStatus.js';

const router = express.Router();

router.get('/', indexContacts);
router.get('/:contactId', showContacts);
router.post('/', createContacts);
router.put('/:contactId', updateContacts);
router.patch('/:contactId/status', updateStatus);
router.delete('/:contactId', deleteContacts);

export { router };
