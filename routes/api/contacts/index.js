import { Router } from 'express';

import { validateCreate, validateUpdate, validateId, validateQuery, validateUpdateFavorite } from '../../../midllewares/validation/contactValidation';

import listContactsController from '../../../controllers/contacts/listContactsController';
import getByIdController from '../../../controllers/contacts/getByIdController';
import removeContactController from '../../../controllers/contacts/removeContactController';
import updateContactController from '../../../controllers/contacts/updateContactController';
import addContactController from '../../../controllers/contacts/addContactController';
import updateContactFavoriteController from '../../../controllers/contacts/updateContactFavoriteController';

import guard from '../../../midllewares/guard';

const router = new Router();

router.get('/', [guard, validateQuery], listContactsController);

router.get('/:id', [guard, validateId], getByIdController);

router.post('/', [guard, validateCreate], addContactController);

router.delete('/:id', [guard, validateId], removeContactController);

router.put(
    '/:id',
    [guard, validateId, validateUpdate],
    updateContactController);

router.patch(
    '/:id/favorite',
    [guard, validateId, validateUpdateFavorite],
    updateContactFavoriteController);

export default router;
