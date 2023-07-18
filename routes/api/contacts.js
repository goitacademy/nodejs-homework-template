import { Router } from "express";

const contactsRouter = Router();

import contactControl from '../../controllers/contacts-controllers.js';

contactsRouter.get("/", contactControl.getAll);

contactsRouter.get("/:contactId", contactControl.getById);

contactsRouter.post("/", contactControl.createNewContact);

contactsRouter.delete("/:contactId", contactControl.deleteById);

contactsRouter.put("/:contactId", contactControl.updateContactById);

export default contactsRouter;
