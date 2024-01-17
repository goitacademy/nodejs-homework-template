
import  express  from 'express';

import { validateContactData } from '../../validation/joi.js';
import { indexContacts } from '../../controlers/contacts/indexContacts.js'
import { showContacts } from '../../controlers/contacts/showContacts.js';
import { createContacts } from '../../controlers/contacts/createContacts.js';
import { deleteContacts } from '../../controlers/contacts/deleteContacts.js';
import { updateContacts } from '../../controlers/contacts/updateContacts.js';

const router = express.Router()

router.get('/', indexContacts);

router.get('/:contactId', showContacts )

router.post('/', validateContactData, createContacts)

router.delete('/:contactId', deleteContacts)

router.put('/:contactId', validateContactData, updateContacts)


export { router }
