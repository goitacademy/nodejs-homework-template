import { Router } from 'express';
import { addContact } from '../../controlers/contacts/addContact.js';
import { delContact } from '../../controlers/contacts/delContact.js';
import { getAllContacts } from '../../controlers/contacts/getAllContact.js';
import { getContactById } from '../../controlers/contacts/getContactById.js';
import { updateFavorite } from '../../controlers/contacts/updateContactStatus.js';
import { updateContact } from '../../controlers/contacts/updateContact.js';
import { auth } from '../../midlewares/auth.js';
import { isValidId } from '../../helpers/validateById.js';
import { validateBody } from '../../helpers/validateBody.js';
import { schemas } from '../../schemas/contacts.js';

const router = Router();

router.get('/', auth, getAllContacts);
router.get('/:contactId', auth, isValidId, getContactById);
router.post('/', auth, validateBody(schemas.addSchema), addContact);
router.delete('/:contactId', auth, isValidId, delContact);
router.put('/:contactId', auth, validateBody(schemas.addSchema), isValidId, updateContact);
router.patch('/contacts/:id/favorite', auth, isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

export default router