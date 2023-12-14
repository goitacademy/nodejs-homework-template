import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidateId } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import { addContactScheme, updateContactScheme } from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, validateBody(addContactScheme), contactsController.addContact);

contactsRouter.put(
	"/:contactId",
	isValidateId,
	isEmptyBody,
	validateBody(updateContactScheme),
	contactsController.updateContactById
);

contactsRouter.delete("/:contactId", isValidateId, contactsController.deleteContact);

export default contactsRouter;
