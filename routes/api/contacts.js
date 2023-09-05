import { Router } from 'express'
import ctrl from '../../controllers/contacts-controllers'
import { validateContacts } from '../../middleware/validation/index.js'
import schemaValidation from '../../schemas/contacts-schemas.js'

const router = Router()

router.get('/', ctrl.getAllContacts)
router.get('/:contactId', ctrl.getContactsById)
router.delete('/:contactId', ctrl.deleteContactsById)

router.post('/', validateContacts(schemaValidation), ctrl.createContact)
router.put('/:contactId', ctrl.updateContact)

export default router