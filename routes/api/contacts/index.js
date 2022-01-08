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

const router = new Router()

router.get('/', getContacts)

router.get('/:id', validateId, getContactById) 

router.post('/', validateAddContact, addContact)

router.delete('/:id', validateId, removeContact )

router.put('/:id', validateId, validateUpdateContact, updateContact)

router.patch('/:id/favorite', validateId, validateUpdateFavorite, updateContact)

export default router
