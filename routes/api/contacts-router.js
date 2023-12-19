/** @format */

import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import {isEmptyBody} from "../../middlewares/index.js";
import {validateBody} from "../../decorators/index.js";
import {
  contactAddShema,
  contactUpdateShema,
} from "../../shemas/contact-shemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", contactsController.contactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddShema),
  contactsController.addContact
);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactUpdateShema),
  contactsController.updateContact
);
export default contactsRouter;
