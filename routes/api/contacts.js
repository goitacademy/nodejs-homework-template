import { Router } from 'express';
const router = new Router();
import { validateCreate, validateUpdate, validateId } from '../../midllewares/validation/contactValidation';
import listContactsController from '../../controllers/contacts/listContactsController';
import getByIdController from '../../controllers/contacts/getByIdController';
import removeContactController from '../../controllers/contacts/removeContactController';
import updateContactController from '../../controllers/contacts/updateContactController';
import addContactController from '../../controllers/contacts/addContactController';

router.get('/', listContactsController);

router.get('/:id', validateId, getByIdController);

router.post('/', validateCreate, addContactController);

router.delete('/:id', validateId, removeContactController);

router.put('/:id', validateUpdate, updateContactController);

export default router;
