import addNewContactContr from './contacts/addNewContactContr'
import allContactsContr from './contacts/allContactsContr'
import contactByIdContr from './contacts/contactByIdContr'
import deleteContactContr from './contacts/deleteContactContr'
import updateContactContr from './contacts/updateContactContr'
import updatePartOfContact from './contacts/updatePartOfContact'

export default {
  addNewContactContr,
  allContactsContr,
  contactByIdContr,
  deleteContactContr,
  updateContactContr,
  updatePartOfContact,
}
// import {
//   validationId,
//   updateValidation,
//   addValidation,
//   updateValidationFavor,
// } from '../../midllewares/validation/contactValidation'
// import { Router } from 'express'

// const router = new Router()

// router.get('/', allContactsContr)
// router.get('/:id', validationId, contactByIdContr)
// router.post('/', addValidation, addNewContactContr)
// router.put('/:id', validationId, updateValidation, updateContactContr)
// router.patch(
//   '/:id/favorite',
//   validationId,
//   updateValidationFavor,
//   updateContactContr,
// )
// router.delete('/:id', validationId, deleteContactContr)

// export default router
