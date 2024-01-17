import express from "express";

import { validateContactData } from "#validation/joi.js";
import { indexContacts } from "#controllers/contacts/indexContacts.js";
import { showContacts } from "#controllers/contacts/showContacts.js";
import { createContacts } from "#controllers/contacts/createContacts.js";
import { deleteContacts } from "#controllers/contacts/deleteContacts.js";
import { updateContacts } from "#controllers/contacts/updateContacts.js";

const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", validateContactData, createContacts);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", validateContactData, updateContacts);

export { router };
