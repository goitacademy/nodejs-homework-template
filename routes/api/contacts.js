import express from "express";

import * as contactSchema from "../../schema/schema.js"
import ctrlContacts from "../../controllers/ctrlContacts.js";
import { validateBody } from "../../decorators/validateBody.js";
import { isValidId } from "../../middlewars/isvalidId.js";

const contactRouter = express.Router();

const contactAddValidate = validateBody(contactSchema.addSchema);
const contactUpdateFavoriteSchema = validateBody(contactSchema.updateFavoriteSchema)

contactRouter.get("/", ctrlContacts.listContacts) 

contactRouter.get("/:contactId", isValidId, ctrlContacts.getById);

contactRouter.post("/", contactAddValidate, ctrlContacts.addContact);

contactRouter.put("/:contactId", isValidId, contactAddValidate, ctrlContacts.updateContact );

contactRouter.patch("/:contactId/favorite", isValidId, contactUpdateFavoriteSchema, ctrlContacts.updateStatusContact );

contactRouter.delete("/:contactId", isValidId, ctrlContacts.removeContact);

export default contactRouter
  