import { Router } from 'express'
import { 
    validateCreate,
     validateUpdate, 
     validateId, 
     validateUpdateFavorite, 
     validateQuery,
     } from './validation'
import {
    getContacts,
     getContactById, 
     addContact, 
     removeContact, 
     updateContact,
    } from '../../../controllers/contacts/index'

import guard from '../../../middlewares/guard'

const router = new Router()

router.get('/', guard, validateQuery, getContacts)

router.get('/:id', guard, validateId, getContactById)

router.post('/', guard, validateCreate, addContact)

router.delete('/:id', guard, validateId,  removeContact)

router.put('/:id', guard, validateId, validateUpdate, updateContact)

router.patch('/:id/favorite', guard, validateId, validateUpdateFavorite, updateContact)

export default router
