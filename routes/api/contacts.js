import { Router } from "express";

import {
  getAllContacts,
  getContact,
  saveNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} from "../../controller/controller.js";

export const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", getContact);

contactsRouter.post("/", saveNewContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", changeContact);

contactsRouter.patch("/:contactId/favorite", updateStatusContact);
