import express from "express";

const router = express.Router();

import { getAllContacts } from "../../controllers/contacts/indexContacts.js";
import { getContact } from "../../controllers/contacts/showContacts.js";
import { createContact } from "../../controllers/contacts/createContacts.js";
import { delateContact } from "../../controllers/contacts/deleteContacts.js";
import { putContact } from "../../controllers/contacts/updateContacts.js";
import { patchContact } from "../../controllers/contacts/updateStatusContacts.js";

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", createContact);

router.delete("/:contactId", delateContact);

router.put("/:contactId", putContact);

router.patch("/:contactId", patchContact);

export { router };
