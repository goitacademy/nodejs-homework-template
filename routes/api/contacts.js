import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

export { router };
