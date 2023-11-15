import express from "express";

import contactService from "../../models/contacts/index.js";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.add);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put("/:contactId", isEmptyBody, contactsController.updateById);

export default contactsRouter;
