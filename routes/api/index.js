import { Router } from 'express';

import { validateCreate, validateUpdate, validateId, validateQuery, validateUpdateFavorite } from '../../midllewares/validation/contactValidation';

import listContactsController from '../../controllers/contacts/listContactsController';
import getByIdController from '../../controllers/contacts/getByIdController';
import removeContactController from '../../controllers/contacts/removeContactController';
import updateContactController from '../../controllers/contacts/updateContactController';
import addContactController from '../../controllers/contacts/addContactController';
import updateContactFavoriteController from '../../controllers/contacts/updateContactFavoriteController';

const router = new Router();

router.get('/', validateQuery, listContactsController);

router.get('/:id', validateId, getByIdController);

router.post('/', validateCreate, addContactController);

router.delete('/:id', validateId, removeContactController);

router.put('/:id', validateId, validateUpdate, updateContactController);

router.patch('/:id/favorite', validateId, validateUpdateFavorite, updateContactFavoriteController);

export default router;
