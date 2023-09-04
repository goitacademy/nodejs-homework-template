import express from "express";
import validateBody from "../../decorators/validateBody.js";
import contactSchema from "../../schema/schema.js"

const contactRouter = express.Router();
const ctrlContacts = "../../controllers/ctrlContacts.js";


const contactAddValidate = validateBody(contactSchema.addContactSchema);

contactRouter.get("/", ctrlContacts.getAll);

contactRouter.get(":contactId",ctrlContacts.getById);

contactRouter.post("/", contactAddValidate, ctrlContacts.add);

contactRouter.put("/:contactId",contactAddValidate, ctrlContacts.put );

contactRouter.delete("/:contactId", ctrlContacts.remove);

export default contactRouter