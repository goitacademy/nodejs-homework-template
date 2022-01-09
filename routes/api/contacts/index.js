import { Router } from 'express'
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite } from './validation'
import { getContacts, getContactById, addContact, removeContact, updateContact } from '../../../controllers/contacts/index'

const router = new Router()

router.get('/', getContacts)

router.get('/:id', validateId, getContactById)

router.post('/', validateCreate, addContact)

router.delete('/:id', validateId, removeContact)

router.put('/:id', validateId, validateUpdate, updateContact)

router.patch('/:id/favorite', validateId, validateUpdateFavorite, updateContact)

export default router;
