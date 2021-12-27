import { Router } from 'express'
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts/index'
import { validatorCreate, validatorId, validatorUpdate, validatorUpdateFavorite} from '../../../midllewares/validation/contactValidation'

const router = new Router()

router.get('/', getContacts)

router.get('/:id', validatorId, getContactById)

router.post('/', validatorCreate, addContact)

router.delete('/:id', validatorId, removeContact)

router.put('/:id', validatorId, validatorUpdate, updateContact)

router.patch('/:id/favorite', validatorId, validatorUpdateFavorite, updateContact)

export default router
