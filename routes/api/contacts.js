import express from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateStatusContact,
} from "../../controllers/contacts.js";
import isValidId from "../../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", listContacts);

contactsRouter.get("/:contactId", isValidId, getContactById);

contactsRouter.post("/", addContact);

contactsRouter.delete("/:contactId", isValidId, removeContact);

contactsRouter.put("/:contactId", isValidId, updateContactById);

contactsRouter.patch("/:contactId/favorite", isValidId, updateStatusContact)

export default contactsRouter;
