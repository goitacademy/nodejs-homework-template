import express from "express";
import { isEmptyBody } from '../../midllewares/index.js'
import { contactsSchema } from '../../schemas/schema-contacts.js'
import { validateBodyReq } from '../../decorators/index.js'
import contactsControllers from '../../controllers/contact-controller.js'

const contactsRouter = express.Router()
const ValidatorContacts = validateBodyReq(contactsSchema)

contactsRouter.get('/', contactsControllers.getAll)

contactsRouter.get('/:contactId', contactsControllers.getById)

contactsRouter.delete('/:contactId', contactsControllers.deleteById)

contactsRouter.post('/', isEmptyBody, ValidatorContacts, contactsControllers.addNew)

contactsRouter.put('/:contactId', isEmptyBody, ValidatorContacts, contactsControllers.updateById)


export default contactsRouter;
