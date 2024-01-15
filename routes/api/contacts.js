import express from 'express';

import { showContact } from '../../functions/getContact.js';
import { indexContact } from '../../functions/contactList.js';
import { createContact } from '../../functions/addContact.js';
import { deleteContact } from '../../functions/deleteContact.js';
import { updateContacts } from '../../functions/updateContact.js';

const router = express.Router();

router.get('/contacts', indexContact);
router.post('/contacts', createContact);
router.get('/contacts/:contactId', showContact);
router.put('/contacts/:contactId', updateContacts);
router.delete('/contacts/:contactId', deleteContact);

export { router };
