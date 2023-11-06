import express from "express";
import { isEmptyBody, isIdChecker, isEmptyBodyFavorite } from '../../middlewares/index.js'
import { contactsSchema, contactsSchemaFavorite } from '../../models/Model-contacts.js'
import { validateBodyReq } from '../../decorators/index.js'
import contactsControllers from '../../controllers/contact-controller.js'

const contactsRouter = express.Router()
const ValidatorContacts = validateBodyReq(contactsSchema)
const ValidatorContactsFavorite = validateBodyReq(contactsSchemaFavorite)

contactsRouter.get('/', contactsControllers.getAll)

contactsRouter.get('/:contactId', isIdChecker, contactsControllers.getById)

contactsRouter.post('/', isEmptyBody, ValidatorContacts, contactsControllers.addNew)

contactsRouter.put('/:contactId', isEmptyBody, isIdChecker, ValidatorContacts, contactsControllers.updateById);

contactsRouter.patch('/:contactId/favorite', isIdChecker, isEmptyBodyFavorite, ValidatorContactsFavorite, contactsControllers.updateByIdFavorite);

contactsRouter.delete('/:contactId', isIdChecker, contactsControllers.deleteById)


export default contactsRouter;
