import express from "express";

import controllersContact  from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import { contactAddSchema, contactUpdateFavoriteSchema, updateContactSchema } from "../../models/Contacts.js";
import {isValidId} from "../../middlewares/isValidid.js"



const contactsRouter = express.Router()

contactsRouter.get('/',controllersContact.getAll)

contactsRouter.get('/:contactId',isValidId, controllersContact.getById)

contactsRouter.post('/',isEmptyBody,validateBody(contactAddSchema) ,controllersContact.add)

contactsRouter.delete('/:contactId',isValidId, controllersContact.deleteById)

contactsRouter.put('/:contactId', isEmptyBody, isValidId, validateBody(updateContactSchema), controllersContact.updateById)

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  controllersContact.updateById
);

export default contactsRouter;