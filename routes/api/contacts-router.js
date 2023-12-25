import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsController.updateContact
);

export default contactsRouter;
