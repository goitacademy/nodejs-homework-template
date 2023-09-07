import express from "express";

import contactSchema from "../../schema/schema.js"
import ctrlContacts from "../../controllers/ctrlContacts.js";
import { validateBody } from "../../decorators/validateBody.js";

const contactRouter = express.Router();

const contactAddValidate = validateBody(contactSchema.addSchema);

contactRouter.get("/", ctrlContacts.getAll) 

contactRouter.get(":contactId",ctrlContacts.getById);

contactRouter.post("/", contactAddValidate, ctrlContacts.add);

contactRouter.put("/:contactId",contactAddValidate, ctrlContacts.put );

contactRouter.delete("/:contactId", ctrlContacts.remove);

export default contactRouter
  