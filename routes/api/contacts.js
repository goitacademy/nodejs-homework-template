import express from "express";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
export const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", createContacts);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContacts);
