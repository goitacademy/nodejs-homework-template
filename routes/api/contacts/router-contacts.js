import { Router } from 'express';
import {
  validateCreate,
  validateId,
  validateUpdate,
  validateUpdateFavorite,
  validateQuery
} from './validation';
import {
  getAddContact,
  getContactById,
  getContacts,
  getRemoveContact,
  getUpdateContact
} from '../../../controllers/contacts/controllers-index';

const router = new Router();

router.get('/',validateQuery, getContacts);

router.get('/:id', validateId, getContactById);

router.post('/', validateCreate, getAddContact);

router.delete('/:id', validateId, getRemoveContact);

router.put('/:id', validateId, validateUpdate, getUpdateContact);

router.patch(
  '/:id/favorite',
  validateId,
  validateUpdateFavorite,
  getUpdateContact
);

export default router;
