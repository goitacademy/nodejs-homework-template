import express from "express";
import { isEmptyBody, isIdChecker, isEmptyBodyFavorite, authorization } from '../../middlewares/index.js'
import { contactsSchema, contactsSchemaFavorite } from '../../models/Model-contacts.js'
import { validateBodyReq } from '../../decorators/index.js'
import contactsControllers from '../../controllers/contact-controller.js'

const contactsRouter = express.Router()
const ValidatorContacts = validateBodyReq(contactsSchema)
const ValidatorContactsFavorite = validateBodyReq(contactsSchemaFavorite)

contactsRouter.get('/', authorization, contactsControllers.getAll)

contactsRouter.get('/:contactId', authorization, isIdChecker, contactsControllers.getById)

contactsRouter.post('/', authorization, isEmptyBody, ValidatorContacts, contactsControllers.addNew)

contactsRouter.put('/:contactId', authorization, isEmptyBody, isIdChecker, ValidatorContacts, contactsControllers.updateById);

contactsRouter.patch('/:contactId/favorite', authorization, isIdChecker, isEmptyBodyFavorite, ValidatorContactsFavorite, contactsControllers.updateByIdFavorite);
contactsRouter.patch('/:contactId/favorite', authorization, isIdChecker, isEmptyBodyFavorite, ValidatorContactsFavorite, contactsControllers.updateByIdFavorite);

contactsRouter.delete('/:contactId', authorization, isIdChecker, contactsControllers.deleteById)


export default contactsRouter;
