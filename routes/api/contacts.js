import express from "express";

import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from '../../controllers/contacts/updateContacts.js';
import { createContacts } from "../../controllers/contacts/createContacts.js";

const router = express.Router();

router.get("/api/contacts", indexContacts);
router.get('/api/contacts/:contactId', showContacts);
router.post("/api/contacts", createContacts);
router.delete('/api/contacts/:contactId', deleteContacts);
router.put('/api/contacts/:contactId', updateContacts);

export default router ;