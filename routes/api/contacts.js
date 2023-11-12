import express from 'express'
import contactsController from '../../controllers/contacts-controller.js'
import { isEmptyBody } from '../../middlewares/index.js'
import { validateBody } from '../../decorators/index.js'
import { contactAddScheme, contactUpdateScheme } from '../../schemas/contact-schemas.js'


const router = express.Router()

router.get('/', contactsController.getAllContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', isEmptyBody, validateBody(contactAddScheme), contactsController.add)

router.put('/:contactId', isEmptyBody, validateBody(contactUpdateScheme), contactsController.updateById)

router.delete('/:contactId', contactsController.deleteById)

export default router
