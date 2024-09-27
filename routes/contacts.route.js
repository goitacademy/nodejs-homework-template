import { Router } from "express";
import {
  getAllContactsHandler,
  getContactHandler,
  createContactsHandler,
  updateContactHandler,
  deleteContactHandler,
  updateFavoriteStatusHandler,
} from "../controllers/contacts.controller.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContactsHandler);
contactsRouter.get("/:id", getContactHandler);
contactsRouter.post("/", createContactsHandler);
contactsRouter.patch("/:id", updateContactHandler);
contactsRouter.delete("/:id", deleteContactHandler);
contactsRouter.patch("/:contactId/favorite", updateFavoriteStatusHandler);

export { contactsRouter };
