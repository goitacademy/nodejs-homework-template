import { Router } from "express";
import * as ctrlContact from "../../controller/contacts.js";
import * as ctrlAuth from "../../controller/auth.js";

export const contactRouter = Router();

contactRouter.get("/", ctrlAuth.authorization, ctrlContact.getContacts);

contactRouter.get(
  "/:contactId",
  ctrlAuth.authorization,
  ctrlContact.getContactByID
);

contactRouter.post("/", ctrlAuth.authorization, ctrlContact.createContact);

contactRouter.delete(
  "/:contactId",
  ctrlAuth.authorization,
  ctrlContact.removeContact
);

contactRouter.put(
  "/:contactId",
  ctrlAuth.authorization,
  ctrlContact.updateContact
);

contactRouter.patch(
  "/:contactId/favorite",
  ctrlAuth.authorization,
  ctrlContact.updateContactFavoriteField
);
