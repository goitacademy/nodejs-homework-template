import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import { addContactScheme, updateContactScheme } from "../../schemes/contact-scheme.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post(
	"/",
	isEmptyBody,
	validateBody(addContactScheme),
	contactsController.addContact
);

contactsRouter.put(
    "/:contactId",
	isEmptyBody,
	validateBody(updateContactScheme),
	contactsController.updateContactById
    );
    
    contactsRouter.delete("/:contactId", contactsController.deleteContact);

    
export default contactsRouter;
