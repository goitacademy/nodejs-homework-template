import { Router } from 'express'
import { validatorCreate, validatorId, validatorUpdate, validatorUpdateFavorite, validatorQuery} from '../../../midllewares/validation/contactValidation'
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts/index'
import guard from '../../../midllewares/guard'

const router = new Router()

router.get('/', [guard,validatorQuery], getContacts)

router.get('/:id', [guard, validatorId], getContactById)

router.post('/', [guard, validatorCreate], addContact)

router.delete('/:id', [guard, validatorId], removeContact)

router.put('/:id', [guard, validatorId, validatorUpdate], updateContact)

router.patch('/:id/favorite', [guard, validatorId, validatorUpdateFavorite], updateContact)

export default router
