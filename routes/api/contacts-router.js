import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, contactsController.addContactById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsController.updateContactsById
);

contactsRouter.delete("/:contactId", contactsController.deleteContactById);

export default contactsRouter;
