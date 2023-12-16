/** @format */

import express from "express";

import contactsService from "../../models/contacts.js";
import contactsController from "../../controllers/contacts-controller.js";
import {isEmptyBody} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", contactsController.contactById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsController.updateContact
);
export default contactsRouter;
