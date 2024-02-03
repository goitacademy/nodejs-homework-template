import express from "express";

import { showContacts } from "../../controllers/contacts/showContacts.js";

import { showContactById } from "../../controllers/contacts/showContactById.js";

import { createContact } from "../../controllers/contacts/createContact.js";

import { deleteContact } from "../../controllers/contacts/deleteContact.js";

import { updateContact } from "../../controllers/contacts/updateContact.js";

const router = express.Router();

router.get("/", showContacts);

router.get("/:contactId", showContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

export { router };
