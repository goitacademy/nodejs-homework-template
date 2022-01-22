import {Router} from "express";
const router = new Router();
import {validateCreate, validateUpdte, validateId, validateUpdteFavorite, validateQuery} from '../../../midlewares/validation.js';
import {getContacts, getContactById, removeContact, updateContact, addContact} from '../../../controller/contacts/index.js';
import guard from '../../../midlewares/guard.js';


router.get('/',[guard, validateQuery], getContacts );

router.get('/:id',[guard,  validateId], getContactById);

router.post('/',[guard, validateCreate], addContact);

router.delete('/:id',[guard,  validateId], removeContact);

router.put('/:id',[guard, validateId], validateUpdte, updateContact);

router.patch('/:id/favorite',[guard, validateId, validateUpdteFavorite], updateContact);

export default router
