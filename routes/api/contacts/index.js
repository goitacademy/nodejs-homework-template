import {Router} from 'express'
import { getContacts,
   getContactById,
   addContact,
    removeContact,
    updateContact } from '../../../controllers/contacts'

import { 
  validateAddContact, 
  validateUpdateContact, 
  validateId, 
  validateUpdateFavorite } from './validation'

import guard from '../../../middlewares/guard'

const router = new Router()

router.get('/', guard, getContacts)

router.get('/:id', [guard, validateId], getContactById) 

router.post('/', [guard, validateAddContact], addContact)

router.delete('/:id', [guard, validateId], removeContact )

router.put('/:id', [guard, validateId, validateUpdateContact], updateContact)

router.patch('/:id/favorite', [guard, validateId, validateUpdateFavorite], updateContact)

export default router
