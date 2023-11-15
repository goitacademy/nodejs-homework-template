import express from "express";

import * as contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.add);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put("/:contactId", isEmptyBody, contactsController.updateById);

export default contactsRouter;
