import express from "express";

import contactsController from "../controllers/contacts-controller.js";
import { isEmptyBody, isValidateId, isEmptyBodyFavorite } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";
import { addContactScheme, contactFavoriteScheme, updateContactScheme } from "../models/contacts.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();


contactsRouter.use(authenticate)

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidateId, contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, validateBody(addContactScheme), contactsController.addContact);

contactsRouter.put(
	"/:contactId",
	isValidateId,
	isEmptyBody,
	validateBody(updateContactScheme),
	contactsController.updateContactById
);

contactsRouter.patch("/:contactId/favorite", isEmptyBodyFavorite, isValidateId, validateBody(contactFavoriteScheme), contactsController.updateContactById)

contactsRouter.delete("/:contactId", isValidateId, contactsController.deleteContact);

export default contactsRouter;
