import express from "express";
import { contactsController } from "../../controllers/index.js";
import {isValidId, authenticate} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", isValidId, contactsController.getContactById);

contactsRouter.post("/", contactsController.addContact);

contactsRouter.delete("/:contactId", isValidId, contactsController.removeContact);

contactsRouter.put("/:contactId", isValidId, contactsController.updateContactById);

contactsRouter.patch("/:contactId/favorite", isValidId, contactsController.updateStatusContact)

export default contactsRouter;
