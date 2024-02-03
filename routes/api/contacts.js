import express from "express";

import { authenticateToken } from '../../middleware/authenticateToken.js';

import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from '../../controllers/contacts/updateContacts.js';
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { updateFavoriteStatusController } from '../../controllers/contacts/updateFavoriteStatus.js';
import { login } from '../../controllers/users/loginUsersController.js';
import { signup } from '../../controllers/users/registerUsersController.js';
import { logout } from '../../controllers/users/logoutUserController.js';

const router = express.Router();

router.get("/api/contacts", authenticateToken, indexContacts);
router.get('/api/contacts/:contactId', authenticateToken, showContacts);
router.post("/api/contacts", authenticateToken, createContacts);
router.delete('/api/contacts/:contactId', authenticateToken, deleteContacts);
router.put('/api/contacts/:contactId', authenticateToken, updateContacts);
router.patch('/api/contacts/:contactId/favorite', authenticateToken, updateFavoriteStatusController);
router.post("/api/users/login", login);
router.post("/api/users/signup", signup);
router.get("/api/users/logout", authenticateToken, async (req, res) => {
    try {
      await logout(req, res);
    } catch (error) {
      console.error('Error in logout route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router ;