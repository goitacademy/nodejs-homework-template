import express from "express";

import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from '../../controllers/contacts/updateContacts.js';
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { updateFavoriteStatusController } from '../../controllers/contacts/updateFavoriteStatus.js';
import { login } from '../../controllers/users/loginUsersController.js';
import { signup } from '../../controllers/users/registerUsersController.js';

const router = express.Router();

router.get("/api/contacts", indexContacts);
router.get('/api/contacts/:contactId', showContacts);
router.post("/api/contacts", createContacts);
router.delete('/api/contacts/:contactId', deleteContacts);
router.put('/api/contacts/:contactId', updateContacts);
router.patch('/api/contacts/:contactId/favorite', updateFavoriteStatusController);
router.post("/api/users/login", login);
router.post("/api/users/signup", signup);

export default router ;