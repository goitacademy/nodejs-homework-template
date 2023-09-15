import { Router } from "express";
import {
  getAllContactsHandler,
  getContactHandler,
  createContactHandler,
  updateContactHandler,
  deleteContactHandler,
} from "./contacts.controller.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContactsHandler);
contactsRouter.get("/:id", getContactHandler);
contactsRouter.post("/", createContactHandler);
contactsRouter.patch("/:id", updateContactHandler);
contactsRouter.delete("/:id", deleteContactHandler);
contactsRouter.patch("/:contactId/favorite", updateFavoriteStatusHandler);

export { contactsRouter };
