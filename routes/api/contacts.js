import { Router } from 'express';

import { addContact } from '../../controlers/addContact.js';
import { delContact } from '../../controlers/delContact.js';
import { getAllContacts } from '../../controlers/getAllContact.js';
import { getContactById } from '../../controlers/getContactById.js';
import { updateFavorite } from '../../controlers/updateContactStatus.js';
import { updateContact } from '../../controlers/updateContact.js';

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