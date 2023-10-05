import { Router } from 'express';

import { addContact } from '../../controlers/contacts/addContact.js';
import { delContact } from '../../controlers/contacts/delContact.js';
import { getAllContacts } from '../../controlers/contacts/getAllContact.js';
import { getContactById } from '../../controlers/contacts/getContactById.js';
import { updateFavorite } from '../../controlers/contacts/updateContactStatus.js';
import { updateContact } from '../../controlers/contacts/updateContact.js';

import { isValidId } from '../../helpers/validateById.js';
import { validateBody } from '../../helpers/validateBody.js';
import { schemas } from '../../schemas/contacts.js';

const router = Router();

router.get('/', getAllContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(schemas.addSchema), addContact);
router.delete('/:contactId', isValidId, delContact);
router.put('/:contactId', validateBody(schemas.addSchema), isValidId, updateContact);
router.patch('/contacts/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

export default router