import { Router } from 'express'
import { validatorCreate, validatorId, validatorUpdate, validatorUpdateFavorite, validatorQuery} from '../../../midllewares/validation/contactValidation'
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts/index'

const router = new Router()

router.get('/',validatorQuery, getContacts)

router.get('/:id', validatorId, getContactById)

router.post('/', validatorCreate, addContact)

router.delete('/:id', validatorId, removeContact)

router.put('/:id', validatorId, validatorUpdate, updateContact)

router.patch('/:id/favorite', validatorId, validatorUpdateFavorite, updateContact)

export default router
