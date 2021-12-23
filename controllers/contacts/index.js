import addNewContactContr from './addNewContactContr'
import allContactsContr from './allContactsContr'
import contactByIdContr from './contactByIdContr'
import deleteContactContr from './deleteContactContr'
import updateContactContr from './updateContactContr'

import { Router } from 'express'
const router = new Router()
import {
  validationId,
  updateValidation,
  addValidation,
} from '../../midllewares/validation/contactValidation'

router.get('/', allContactsContr)
router.get('/:id', validationId, contactByIdContr)
router.post('/', addValidation, addValidation, addNewContactContr)
router.put('/:id', validationId, updateValidation, updateContactContr)
router.delete('/:id', validationId, deleteContactContr)

export default router
