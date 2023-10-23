import { Router } from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
import {
  schema,
  updateSchema,
} from "../../validators/createContactValidators.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { createContact } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
const router = Router();

router.get("/contacts", indexContacts);

router.get("/:contactId", showContacts);

router.post("/contacts", createContact);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContacts);

export { router };
