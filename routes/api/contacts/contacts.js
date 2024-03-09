// routes/api/contacts.js
import express from "express";

import { authenticateToken } from '../../../middleware/authenticateToken.js';

import { indexContacts } from "../../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../../controllers/contacts/deleteContacts.js";
import { updateContacts } from '../../../controllers/contacts/updateContacts.js';
import { createContacts } from "../../../controllers/contacts/createContacts.js";
import { updateFavoriteStatusController } from '../../../controllers/contacts/updateFavoriteStatus.js';

const router = express.Router();

router.get("/api/contacts", authenticateToken, indexContacts);
router.get('/api/contacts/:contactId', authenticateToken, showContacts);
router.post("/api/contacts", authenticateToken, createContacts);
router.delete('/api/contacts/:contactId', authenticateToken, deleteContacts);
router.put('/api/contacts/:contactId', authenticateToken, updateContacts);
router.patch('/api/contacts/:contactId/favorite', authenticateToken, updateFavoriteStatusController);

export default router ;