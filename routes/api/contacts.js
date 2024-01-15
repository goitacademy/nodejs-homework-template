import { Router } from "express";
import { showContact } from "../../controllers/contacts/showContacts.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { createContact } from "../../controllers/contacts/createContacts.js";
import { deleteContact } from "../../controllers/contacts/deleteContacts.js";
import { updateContact } from "../../controllers/contacts/updateContacts.js";

const router = Router();

router.get("/", indexContacts);

router.get("/:contactId", showContact);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

export default router;
