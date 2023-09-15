import express from "express";

import contactSchema from "../../schema/contactsSchema.js"
import ctrlContacts from "../../controllers/ctrlContacts.js";

import { authenticate, isValidId } from "../../middlewars/index.js";
import {validateBody} from "../../decorators/index.js";

const contactRouter = express.Router();


const contactAddValidate = validateBody(contactSchema.addSchema);
const contactUpdateFavoriteSchema = validateBody(contactSchema.updateFavoriteSchema)


contactRouter.use(authenticate)

contactRouter.get("/", ctrlContacts.listContacts) 

contactRouter.get("/:contactId", isValidId, ctrlContacts.getById);

contactRouter.post("/", contactAddValidate, ctrlContacts.addContact);

contactRouter.put("/:contactId", isValidId, contactAddValidate, ctrlContacts.updateContact );

contactRouter.patch("/:contactId/favorite", isValidId, contactUpdateFavoriteSchema, ctrlContacts.updateStatusContact );

contactRouter.delete("/:contactId", isValidId, ctrlContacts.removeContact);

export default contactRouter
  