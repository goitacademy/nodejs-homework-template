import express from "express";

import controllersContact  from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import { contactAddSchema, contactUpdateFavoriteSchema, updateContactSchema } from "../../models/Contacts.js";
import {isValidId} from "../../middlewares/isValidid.js"
import  authenticate  from "../../middlewares/authenticate.js";



const contactsRouter = express.Router()

contactsRouter.get('/',authenticate,controllersContact.getAll)

contactsRouter.get('/:contactId',authenticate,isValidId, controllersContact.getById)

contactsRouter.post('/',authenticate,isEmptyBody,validateBody(contactAddSchema) ,controllersContact.add)

contactsRouter.delete('/:contactId',authenticate,isValidId, controllersContact.deleteById)

contactsRouter.put('/:contactId',authenticate, isEmptyBody, isValidId, validateBody(updateContactSchema), controllersContact.updateById)

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  controllersContact.updateById
);

export default contactsRouter;