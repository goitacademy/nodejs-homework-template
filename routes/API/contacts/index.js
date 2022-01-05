import {Router} from "express";
const router = new Router();
import {validateCreate, validateUpdte, validateId, validateUpdteFavorite, validateQuery} from './validation.js';
import {getContacts, getContactById, removeContact, updateContact, addContact, updateStatusContact} from '../../../controller/contacts/index.js'

router.get('/',validateQuery, getContacts );

router.get('/:id', validateId, getContactById);

router.post('/',validateCreate, addContact);

router.delete('/:id', validateId, removeContact);

router.put('/:id',validateId, validateUpdte, updateContact);

router.patch('/:id/favorite',validateUpdteFavorite, validateId, updateStatusContact);

export default router

