import { Router } from "express";
import { createContact } from "../../controllers/contacts/createContacts";
import { deleteContact } from "../../controllers/contacts/deleteContacts";
import { indexContacts } from "../../controllers/contacts/indexContacts";
import { showContact } from "../../controllers/contacts/showContacts";
import { updateContact } from "../../controllers/contacts/updateContacts";

const router = Router();

router.get("/", indexContacts);

router.get("/:contactId", showContact);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

export default router;
