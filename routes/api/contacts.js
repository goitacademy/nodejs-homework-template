import Controllers from '../../controllers'
import {
  validationId,
  updateValidation,
  addValidation,
  validateQuery,
  updateValidationFavor,
} from '../../midllewares/validation/contactValidation'
import { Router } from 'express'

const router = new Router()

router.get('/', validateQuery, Controllers.allContactsContr)
router.get('/:id', validationId, Controllers.contactByIdContr)
router.post('/', addValidation, Controllers.addNewContactContr)
router.delete('/:id', validationId, Controllers.deleteContactContr)
router.put(
  '/:id',
  validationId,
  updateValidation,
  Controllers.updateContactContr,
)
router.patch(
  '/:id/favorite',
  validationId,
  updateValidationFavor,
  Controllers.updatePartOfContact,
)
export default router
